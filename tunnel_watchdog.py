import subprocess, time, re, sys, os, threading
TUNNEL_URL_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tunnel_url.txt")
PORT = 8080
LT_CMD = r"C:\Users\swpoe\AppData\Roaming\npm\lt.cmd"

def run_tunnel():
    while True:
        print("[tunnel] Starting localtunnel...")
        try:
            proc = subprocess.Popen(
                [LT_CMD, "--port", str(PORT)],
                stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True
            )
            url = None
            for line in iter(proc.stdout.readline, ""):
                print("[tunnel]", line.rstrip())
                m = re.search(r"https://[a-z0-9\-]+\.loca\.lt", line)
                if m and not url:
                    url = m.group(0)
                    with open(TUNNEL_URL_FILE, "w") as f:
                        f.write(url)
                    print(f"TUNNEL_READY: {url}")
            proc.wait()
        except Exception as e:
            print(f"[tunnel] Error: {e}")
        print("[tunnel] Died, restarting in 3s...")
        time.sleep(3)

if __name__ == "__main__":
    run_tunnel()
