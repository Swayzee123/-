import os
d = "C:/Users/swpoe/Documents/Codex/2026-09-11/new-chat/match-shop-bot/webapp/assets/products"
os.makedirs(d, exist_ok=True)

products = [
    ("chatgpt", "ChatGPT", "#10a37f", "#065f46"),
    ("claude", "Claude", "#d97706", "#7c4a03"),
    ("perplexity", "Perplexity", "#20b2aa", "#0d5c57"),
    ("spotify", "Spotify", "#1db954", "#0d6b30"),
    ("yt", "YouTube", "#cc0000", "#880000"),
    ("apple", "Apple Music", "#fc3c44", "#8b1f24"),
    ("canva", "Canva", "#7c3aed", "#4c1d95"),
    ("notion", "Notion", "#999999", "#333333"),
    ("m365", "Microsoft 365", "#0078d4", "#003d6e"),
    ("steam", "Steam", "#1b2838", "#0e1520"),
    ("psn", "PlayStation", "#003087", "#001444"),
    ("xbox", "Xbox", "#107c10", "#064d06"),
]

for pid, name, c1, c2 in products:
    # Pixel art sakura SVG with product branding
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
<defs>
<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="{c1}"/>
<stop offset="100%" stop-color="{c2}"/>
</linearGradient>
<linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="rgba(255,255,255,0.15)"/>
<stop offset="50%" stop-color="rgba(255,255,255,0)"/>
<stop offset="100%" stop-color="rgba(255,255,255,0.08)"/>
</linearGradient>
<pattern id="px" width="8" height="8" patternUnits="userSpaceOnUse">
<rect width="8" height="8" fill="transparent"/>
<rect width="4" height="4" fill="rgba(255,255,255,0.03)"/>
<rect x="4" y="4" width="4" height="4" fill="rgba(255,255,255,0.03)"/>
</pattern>
</defs>
<rect width="400" height="400" fill="url(#bg)"/>
<rect width="400" height="400" fill="url(#px)"/>
<rect width="400" height="400" fill="url(#shine)"/>
<!-- Sakura petals pixel art -->
<g fill="rgba(232,93,138,0.12)">
<rect x="30" y="40" width="8" height="8"/><rect x="38" y="48" width="8" height="8"/>
<rect x="340" y="60" width="8" height="8"/><rect x="348" y="52" width="8" height="8"/>
<rect x="20" y="300" width="8" height="8"/><rect x="28" y="308" width="8" height="8"/>
<rect x="350" y="320" width="8" height="8"/><rect x="358" y="312" width="8" height="8"/>
<rect x="80" y="20" width="6" height="6"/><rect x="300" y="30" width="6" height="6"/>
<rect x="60" y="350" width="6" height="6"/><rect x="320" y="360" width="6" height="6"/>
<rect x="180" y="15" width="8" height="8"/><rect x="188" y="23" width="8" height="8"/>
<rect x="175" y="23" width="8" height="8"/>
<rect x="180" y="345" width="8" height="8"/><rect x="188" y="353" width="8" height="8"/>
<rect x="175" y="353" width="8" height="8"/>
</g>
<!-- Main logo shape -->
<rect x="150" y="120" width="100" height="100" rx="8" fill="rgba(0,0,0,0.3)"/>
<rect x="155" y="125" width="90" height="90" rx="4" fill="rgba(0,0,0,0.2)"/>
<!-- Diamond shape -->
<polygon points="200,135 240,175 200,215 160,175" fill="rgba(232,169,58,0.3)" stroke="rgba(232,169,58,0.5)" stroke-width="2"/>
<polygon points="200,145 232,175 200,205 168,175" fill="rgba(232,169,58,0.15)"/>
<!-- Center dot -->
<rect x="195" y="170" width="10" height="10" fill="rgba(232,169,58,0.6)"/>
<!-- Product name -->
<text x="200" y="260" text-anchor="middle" font-size="22" font-weight="bold" fill="white" font-family="system-ui,sans-serif">{name}</text>
<!-- Brand watermark -->
<text x="200" y="380" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.2)" font-family="monospace" letter-spacing="4">MATCH SHOP</text>
<!-- Corner sakura dots -->
<g fill="rgba(232,93,138,0.2)">
<rect x="12" y="12" width="4" height="4"/><rect x="20" y="16" width="4" height="4"/>
<rect x="384" y="12" width="4" height="4"/><rect x="376" y="16" width="4" height="4"/>
<rect x="12" y="384" width="4" height="4"/><rect x="20" y="380" width="4" height="4"/>
<rect x="384" y="384" width="4" height="4"/><rect x="376" y="380" width="4" height="4"/>
</g>
</svg>'''
    with open(f"{d}/{pid}.svg", "w", encoding="utf-8") as f:
        f.write(svg)
print("done", len(products))