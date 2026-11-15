"""One-off: convert the reference site's oversized images into web-sized WebP in public/.
Usage: python scripts/optimize-images.py <downloaded-assets-dir>
"""
import sys
from pathlib import Path
from PIL import Image

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "public"


def save(src, dest, width=None, height=None, quality=74, fmt="WEBP"):
    im = Image.open(SRC / src)
    im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
    if width and im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    if height and im.height > height:
        im = im.resize((round(im.width * height / im.height), height), Image.LANCZOS)
    out = OUT / dest
    out.parent.mkdir(parents=True, exist_ok=True)
    if fmt == "JPEG":
        im = im.convert("RGB")
    im.save(out, fmt, quality=quality, method=6) if fmt == "WEBP" else im.save(out, fmt, quality=quality)
    print(f"{dest}: {im.size} {out.stat().st_size // 1024}KB")


for name in ("rajasthan", "csme", "business2"):
    save(f"hero-banners/{name}.webp", f"img/banners/{name}.webp", width=720, quality=72)

for folder in ("insights", "knowledge", "market-suchna-images"):
    for p in (SRC / folder).glob("*.webp"):
        save(f"{folder}/{p.name}", f"img/{folder}/{p.name}", width=960, quality=70)
save("market-suchna-images/contact_advisory.png", "img/market-suchna-images/contact_advisory.webp", width=900, quality=72)
save("popup.jpeg", "img/popup.webp", width=640, quality=72)

for p in (SRC / "logos").glob("*.png"):
    save(f"logos/{p.name}", f"img/logos/{p.stem}.webp", height=112, quality=80)

# Brand logo, favicons and app icons come from the company profile PDF: see scripts/brand-assets.py.
