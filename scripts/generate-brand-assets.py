"""Generate web-ready Demian logo assets from the archived official PDF.

The supplied PDF contains a single flattened JPEG rather than vector paths. This
script preserves those source pixels and the official #1E3A5F background; it
does not trace, redraw, recolor, or remove the background from the artwork.
"""

from __future__ import annotations

import base64
import io
from pathlib import Path

import pymupdf as fitz
from PIL import Image, ImageColor


ROOT = Path(__file__).resolve().parents[1]
SOURCE_PDF = ROOT / "assets" / "brand" / "Demian Logo.pdf"
PUBLIC = ROOT / "public"
BRAND_DIR = PUBLIC / "images" / "brand"
NAVY_HEX = "#1E3A5F"
NAVY = ImageColor.getrgb(NAVY_HEX)
RESAMPLE = Image.Resampling.LANCZOS


def extract_source_image() -> Image.Image:
    with fitz.open(SOURCE_PDF) as document:
        candidates = [
            image
            for page in document
            for image in page.get_images(full=True)
        ]
        if not candidates:
            raise RuntimeError("The official logo PDF does not contain a raster image.")

        largest = max(candidates, key=lambda item: item[2] * item[3])
        extracted = document.extract_image(largest[0])

    source = Image.open(io.BytesIO(extracted["image"])).convert("RGB")
    if source.size != (3600, 1500):
        raise RuntimeError(f"Unexpected official logo dimensions: {source.size!r}")
    if source.getpixel((0, 0)) != NAVY:
        raise RuntimeError("The official background color no longer matches #1E3A5F.")
    return source


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG", optimize=True)


def make_compact_lockup(source: Image.Image) -> Image.Image:
    # Each piece is copied directly from the official raster. Recomposition
    # omits only the tagline so the brand remains readable in the site header.
    compact = Image.new("RGB", (2380, 920), NAVY)
    compact.paste(source.crop((280, 370, 1060, 1150)), (40, 70))
    compact.paste(source.crop((1190, 290, 1240, 1210)), (900, 0))
    compact.paste(source.crop((1360, 440, 2600, 920)), (1090, 220))
    return compact


def contain(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    contained = image.copy()
    contained.thumbnail(size, RESAMPLE)
    return contained


def main() -> None:
    source = extract_source_image()

    full = source.crop((270, 250, 2640, 1250))
    compact = make_compact_lockup(source)
    emblem = source.crop((260, 360, 1080, 1180))

    save_png(full, BRAND_DIR / "demian-logo-full.png")
    save_png(compact, BRAND_DIR / "demian-logo-horizontal.png")
    save_png(emblem, BRAND_DIR / "demian-emblem.png")

    for size, filename in (
        (48, "favicon-48x48.png"),
        (192, "favicon-192x192.png"),
        (512, "favicon-512x512.png"),
        (180, "apple-touch-icon.png"),
    ):
        save_png(emblem.resize((size, size), RESAMPLE), PUBLIC / filename)

    emblem.save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    favicon_png = io.BytesIO()
    emblem.resize((192, 192), RESAMPLE).save(favicon_png, format="PNG", optimize=True)
    favicon_data = base64.b64encode(favicon_png.getvalue()).decode("ascii")
    (PUBLIC / "favicon.svg").write_text(
        "\n".join(
            [
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">',
                f'  <image width="512" height="512" href="data:image/png;base64,{favicon_data}"/>',
                "</svg>",
                "",
            ]
        ),
        encoding="utf-8",
    )

    social = Image.new("RGB", (1200, 630), NAVY)
    social_lockup = contain(full, (1080, 500))
    social.paste(
        social_lockup,
        ((social.width - social_lockup.width) // 2, (social.height - social_lockup.height) // 2),
    )
    social_path = BRAND_DIR / "demian-social-card.png"
    save_png(social, social_path)

    social_data = base64.b64encode(social_path.read_bytes()).decode("ascii")
    (BRAND_DIR / "demian-social-card.svg").write_text(
        "\n".join(
            [
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">',
                "  <title id=\"title\">Demian Insurance Agency</title>",
                "  <desc id=\"desc\">Official Demian Insurance Agency coastal logo and tagline.</desc>",
                f'  <image width="1200" height="630" href="data:image/png;base64,{social_data}"/>',
                "</svg>",
                "",
            ]
        ),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
