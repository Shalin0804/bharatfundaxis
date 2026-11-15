"""Cut the official logo symbol out of the company profile PDF and build the logo, favicon and app-icon files.

    python scripts/brand-assets.py path/to/BharatFundAxis_Company_Profile.pdf

The symbol is the profile's own embedded image (pages 2-12). Only its flat cream background is made transparent;
the artwork itself is not redrawn, recoloured or reshaped. Needs PyMuPDF, Pillow, NumPy and SciPy.
"""
import sys
from pathlib import Path

import numpy as np
import pymupdf
from PIL import Image
from scipy import ndimage

PUBLIC = Path(__file__).resolve().parent.parent / "public"
CREAM = (253, 251, 239, 255)

doc = pymupdf.open(sys.argv[1])
xref = doc[11].get_images()[0][0]  # page 12: the symbol on its own
pix = pymupdf.Pixmap(doc, xref)
src = np.frombuffer(pix.samples, np.uint8).reshape(pix.height, pix.width, pix.n)[..., :3].astype(float)

# Background = cream pixels connected to the image border; their alpha ramps with distance from cream,
# which keeps the anti-aliased edge. White shapes inside the symbol are not connected, so they stay opaque.
bg_rgb = np.array([253.5, 251.5, 239.5])
dist = np.sqrt(((src - bg_rgb) ** 2).sum(-1))
lo, hi = 6, 70
labels, _ = ndimage.label(dist < hi)
edge = set(np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))) - {0}
bg = np.isin(labels, list(edge))
alpha = np.ones(dist.shape)
alpha[bg] = np.clip((dist[bg] - lo) / (hi - lo), 0, 1)
a = np.maximum(alpha, 1e-6)[..., None]
rgb = np.clip((src - (1 - a) * bg_rgb) / a, 0, 255)
symbol = Image.fromarray(np.dstack([rgb, alpha * 255]).astype(np.uint8), "RGBA")
symbol = symbol.crop(symbol.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())

symbol.save(PUBLIC / "img/logo-symbol.png", optimize=True)
symbol.save(PUBLIC / "img/logo-symbol.webp", quality=92, method=6)
symbol.resize((132, round(132 * symbol.height / symbol.width)), Image.LANCZOS).save(
    PUBLIC / "img/logo-mark.webp", quality=90, method=6
)


def square(size, pad=0, fill=(0, 0, 0, 0)):
    canvas = Image.new("RGBA", (size, size), fill)
    scale = min((size - 2 * pad) / symbol.width, (size - 2 * pad) / symbol.height)
    mark = symbol.resize((round(symbol.width * scale), round(symbol.height * scale)), Image.LANCZOS)
    canvas.alpha_composite(mark, ((size - mark.width) // 2, (size - mark.height) // 2))
    return canvas


square(32).save(PUBLIC / "favicon-32.png", optimize=True)
square(256).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
square(180, 18, CREAM).convert("RGB").save(PUBLIC / "apple-touch-icon.png", optimize=True)
square(192, 22, CREAM).save(PUBLIC / "icon-192.png", optimize=True)
square(512, 60, CREAM).save(PUBLIC / "icon-512.png", optimize=True)
print("symbol", symbol.size)
