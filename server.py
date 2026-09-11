import hashlib
import hmac
import json
import logging
import os
import secrets
import time
import threading
from collections import defaultdict
from functools import wraps
from pathlib import Path

import httpx
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory

load_dotenv()
logging.basicConfig(level=logging.INFO)
logging.getLogger("httpx").setLevel(logging.WARNING)

NOWPAYMENTS_API_KEY = os.getenv("NOWPAYMENTS_API_KEY", "")
NOWPAYMENTS_IPN_SECRET = os.getenv("NOWPAYMENTS_IPN_SECRET", "")
NOWPAYMENTS_API = "https://api.nowpayments.io/v1"
CRYPTOBOT_TOKEN = os.getenv("CRYPTOBOT_TOKEN", "")
CRYPTOBOT_API = "https://pay.crypt.bot/api"
WEBAPP_DIR = Path(__file__).parent / "webapp"

app = Flask(__name__, static_folder=str(WEBAPP_DIR))

# Rate Limiter
_rate_store = defaultdict(list)

def rate_limit(max_requests=30, window_seconds=60):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            ip = request.remote_addr or "unknown"
            now = time.time()
            _rate_store[ip] = [t for t in _rate_store[ip] if now - t < window_seconds]
            if len(_rate_store[ip]) >= max_requests:
                return jsonify({"error": "Too many requests"}), 429
            _rate_store[ip].append(now)
            return f(*args, **kwargs)
        return wrapper
    return decorator

def validate_order(data):
    if not isinstance(data, dict):
        return False
    items = data.get("items", [])
    if not isinstance(items, list) or len(items) == 0 or len(items) > 50:
        return False
    method = data.get("method", "")
    if method not in ("crypto", "card", "cryptobot"):
        return False
    total = 0
    for item in items:
        if not isinstance(item, dict):
            return False
        name = item.get("name", "")
        if not isinstance(name, str) or len(name) > 100:
            return False
        price = item.get("price", 0)
        if not isinstance(price, (int, float)) or price <= 0 or price > 10000:
            return False
        total += price
    return total <= 50000

@app.after_request
def security_headers(response):
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    csp = "default-src 'self'; script-src 'self' 'unsafe-inline' https://telegram.org; "
    csp += "style-src 'self' 'unsafe-inline'; img-src 'self' data:; "
    csp += "connect-src 'self' https://api.nowpayments.io https://pay.crypt.bot; "
    csp += "frame-src https://*.nowpayments.io https://*.crypt.bot;"
    response.headers["Content-Security-Policy"] = csp
    return response

@app.route("/")
def index():
    return send_from_directory(str(WEBAPP_DIR), "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(str(WEBAPP_DIR), path)

def create_nowpayment_invoice(items, method):
    total = sum(i.get("price", 0) for i in items)
    order_id = secrets.token_hex(8)
    cb_url = os.getenv("PUBLIC_URL", "") + "/api/ipn-callback"
    names = [i.get("name", "Item") for i in items]
    desc = "MATCH: " + ", ".join(names)
    if len(desc) > 100:
        desc = desc[:97] + "..."
    payload = {
        "price_amount": total, "price_currency": "usd",
        "ipn_callback_url": cb_url, "order_id": order_id,
        "order_description": desc,
    }
    if method == "card":
        payload["pay_currency"] = "usdttrc20"
    with httpx.Client() as c:
        r = c.post(NOWPAYMENTS_API + "/invoice", json=payload,
                   headers={"x-api-key": NOWPAYMENTS_API_KEY}, timeout=15)
        result = r.json()
    if "invoice_url" in result:
        return {"invoice_url": result["invoice_url"], "order_id": order_id}
    return {"error": result.get("message", "Gateway error")}

def create_cryptobot_invoice(items):
    total = sum(i.get("price", 0) for i in items)
    names = [i.get("name", "Item") for i in items]
    desc = "MATCH: " + ", ".join(names)
    payload = {
        "currency_type": "fiat", "fiat": "USD", "paid_asset": "USDT",
        "amount": str(total), "description": desc,
        "paid_btn_name": "callback",
        "paid_btn_url": os.getenv("PUBLIC_URL", ""),
        "payload": json.dumps({"items": items}),
    }
    with httpx.Client() as c:
        r = c.post(CRYPTOBOT_API + "/createInvoice", json=payload,
                   headers={"Crypto-Pay-API-Token": CRYPTOBOT_TOKEN}, timeout=15)
        result = r.json()
    if result.get("ok") and result.get("result"):
        inv = result["result"]
        url = inv.get("mini_app_invoice_url") or inv.get("pay_url")
        return {"invoice_url": url, "invoice_id": inv.get("invoice_id")}
    return {"error": result.get("error", {}).get("message", "CryptoBot error")}

@app.route("/api/create-invoice", methods=["POST"])
@rate_limit(max_requests=10, window_seconds=60)
def create_invoice():
    data = request.get_json(silent=True)
    if not data or not validate_order(data):
        return jsonify({"error": "Invalid request"}), 400
    items = data.get("items", [])
    method = data.get("method", "crypto")
    if not NOWPAYMENTS_API_KEY and method in ("crypto", "card"):
        oid = secrets.token_hex(8)
        return jsonify({"invoice_url": "https://nowpayments.io/demo?order=" + oid, "order_id": oid, "demo": True})
    if not CRYPTOBOT_TOKEN and method == "cryptobot":
        return jsonify({"error": "CryptoBot not configured"}), 503
    try:
        if method == "cryptobot":
            result = create_cryptobot_invoice(items)
        else:
            result = create_nowpayment_invoice(items, method)
        return jsonify(result)
    except Exception:
        logging.exception("Invoice failed")
        return jsonify({"error": "Internal error"}), 500

@app.route("/api/ipn-callback", methods=["POST"])
def ipn_callback():
    sig = request.headers.get("x-nowpayments-sig", "")
    body = request.get_data()
    if NOWPAYMENTS_IPN_SECRET:
        expected = hmac.new(NOWPAYMENTS_IPN_SECRET.encode(), body, hashlib.sha512).hexdigest()
        if not hmac.compare_digest(sig, expected):
            logging.warning("Bad IPN sig from %s", request.remote_addr)
            return jsonify({"error": "Invalid signature"}), 403
    data = request.get_json(silent=True)
    if data:
        logging.info("IPN: order=%s status=%s", data.get("order_id"), data.get("payment_status"))
    return jsonify({"ok": True})

@app.route("/api/cryptobot-webhook", methods=["POST"])
def cryptobot_webhook():
    data = request.get_json(silent=True)
    if data and data.get("update_type") == "invoice_paid":
        logging.info("CryptoBot: invoice paid")
    return jsonify({"ok": True})

@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "ts": int(time.time())})


def run_flask():
    port = int(os.getenv("PORT", 8080))
    app.run(host="0.0.0.0", port=port, debug=False)

def run_bot():
    from bot import run as bot_run
    bot_run()

if __name__ == "__main__":
    flask_thread = threading.Thread(target=run_flask, daemon=True)
    flask_thread.start()
    run_bot()
