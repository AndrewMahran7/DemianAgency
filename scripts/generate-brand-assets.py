"""Generate web-ready Demian brand assets from the archived official PDF.

The supplied PDF contains one flattened JPEG, not editable vector artwork. The
generator therefore preserves the source silhouettes and anti-aliasing while
separating the baked navy canvas from the official light, gray-blue, and gold
artwork. It never substitutes fonts or redraws the logo.
"""

from __future__ import annotations

import base64
import io
from pathlib import Path

import numpy as np
import pymupdf as fitz
from PIL import Image, ImageColor, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE_PDF = ROOT / "assets" / "brand" / "Demian Logo.pdf"
PUBLIC = ROOT / "public"
BRAND_DIR = PUBLIC / "images" / "brand"

NAVY_HEX = "#1E3A5F"
NAVY = ImageColor.getrgb(NAVY_HEX)
IVORY = ImageColor.getrgb("#FFFEFD")
GRAY_BLUE = ImageColor.getrgb("#A3ABAF")
GOLD = ImageColor.getrgb("#D6BC87")
HEADER_TAGLINE_GOLD = ImageColor.getrgb("#80602A")

# Representative solid source colors used to recover opacity from the JPEG's
# compositing against the official navy background.
SOURCE_COLORS = np.asarray((IVORY, GRAY_BLUE, GOLD), dtype=np.float32)
RESAMPLE = Image.Resampling.LANCZOS


def extract_source_image() -> Image.Image:
    with fitz.open(SOURCE_PDF) as document:
        candidates = [image for page in document for image in page.get_images(full=True)]
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


def recover_transparency(
    source: Image.Image,
    output_colors: tuple[tuple[int, int, int], ...],
    *,
    tagline_color: tuple[int, int, int] | None = None,
) -> Image.Image:
    """Recover source opacity and map official color roles for a target surface.

    Each JPEG pixel is compared with the three known source color families as
    if it had been alpha-composited over #1E3A5F. The closest reconstruction
    selects the family and opacity. This removes the baked canvas without
    tracing or altering the source geometry.
    """

    pixels = np.asarray(source, dtype=np.float32)
    background = np.asarray(NAVY, dtype=np.float32)
    delta = pixels - background

    alphas: list[np.ndarray] = []
    residuals: list[np.ndarray] = []
    for source_color in SOURCE_COLORS:
        direction = source_color - background
        alpha = np.clip(np.sum(delta * direction, axis=2) / np.sum(direction * direction), 0.0, 1.0)
        reconstruction = background + alpha[..., None] * direction
        residual = np.sum((pixels - reconstruction) ** 2, axis=2)
        alphas.append(alpha)
        residuals.append(residual)

    alpha_stack = np.stack(alphas, axis=2)
    family = np.argmin(np.stack(residuals, axis=2), axis=2)

    # The tagline is a deliberately muted gold in the source. Its low
    # saturation can be mathematically closer to gray-blue after JPEG
    # compression, so preserve the source's known semantic color role.
    tagline_region = np.zeros(family.shape, dtype=bool)
    tagline_region[930:1130, 1300:2700] = True
    family = np.where(tagline_region, 2, family)
    alpha = np.take_along_axis(alpha_stack, family[..., None], axis=2)[..., 0]

    # Suppress only the JPEG's near-background noise, then restore the full
    # opacity range so legitimate anti-aliased edges remain smooth.
    alpha = np.clip((alpha - 0.025) / 0.975, 0.0, 1.0)
    colors = np.asarray(output_colors, dtype=np.uint8)
    rgb = colors[family]
    if tagline_color is not None:
        rgb[tagline_region] = np.asarray(tagline_color, dtype=np.uint8)
    rgba = np.dstack((rgb, np.rint(alpha * 255.0).astype(np.uint8)))
    return Image.fromarray(rgba, mode="RGBA")


def make_header_lockup(source: Image.Image, *, include_tagline: bool) -> Image.Image:
    """Recompose only official source regions into the header's compact canvas."""

    lockup = Image.new("RGBA", (2380, 920), (0, 0, 0, 0))
    lockup.alpha_composite(source.crop((280, 370, 1060, 1150)), (40, 70))
    lockup.alpha_composite(source.crop((1190, 290, 1240, 1210)), (900, 0))
    if include_tagline:
        lockup.alpha_composite(source.crop((1360, 440, 2600, 1120)), (1090, 120))
    else:
        lockup.alpha_composite(source.crop((1360, 440, 2600, 920)), (1090, 220))
    return lockup


def contain(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    contained = image.copy()
    contained.thumbnail(size, RESAMPLE)
    return contained


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG", optimize=True)


def png_bytes(image: Image.Image) -> bytes:
    stream = io.BytesIO()
    image.save(stream, format="PNG", optimize=True)
    return stream.getvalue()


def write_embedded_svg(image: Image.Image, path: Path, *, raster_width: int | None = None) -> None:
    payload = image
    if raster_width is not None and image.width > raster_width:
        payload = image.resize((raster_width, round(image.height * raster_width / image.width)), RESAMPLE)
    encoded = base64.b64encode(png_bytes(payload)).decode("ascii")
    width, height = image.size
    path.write_text(
        "\n".join(
            (
                f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
                f'  <image width="{width}" height="{height}" href="data:image/png;base64,{encoded}"/>',
                "</svg>",
                "",
            )
        ),
        encoding="utf-8",
    )


def make_favicon(emblem: Image.Image) -> Image.Image:
    """Place the reversed emblem on a circular official-navy field."""

    icon = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    draw = ImageDraw.Draw(icon)
    draw.ellipse((64, 64, 960, 960), fill=(*NAVY, 255))
    artwork = emblem.resize((960, 960), RESAMPLE)
    icon.alpha_composite(artwork, (32, 32))
    return icon


def main() -> None:
    source = extract_source_image()

    # Light surfaces use official navy for the ivory/gray source roles; dark
    # surfaces retain the official ivory, gray-blue, and gold relationships.
    header_source = recover_transparency(
        source,
        (NAVY, NAVY, GOLD),
        tagline_color=HEADER_TAGLINE_GOLD,
    )
    footer_source = recover_transparency(source, (IVORY, GRAY_BLUE, GOLD))

    header = make_header_lockup(header_source, include_tagline=True)
    header_compact = make_header_lockup(header_source, include_tagline=False)
    drawer = make_header_lockup(footer_source, include_tagline=False)
    footer = footer_source.crop((270, 250, 2640, 1250))

    header_emblem = header_source.crop((260, 360, 1080, 1180)).resize((1024, 1024), RESAMPLE)
    footer_emblem = footer_source.crop((260, 360, 1080, 1180))
    favicon = make_favicon(footer_emblem)

    write_embedded_svg(header, BRAND_DIR / "demian-logo-header.svg", raster_width=1200)
    write_embedded_svg(header_compact, BRAND_DIR / "demian-logo-header-compact.svg", raster_width=1200)
    write_embedded_svg(drawer, BRAND_DIR / "demian-logo-drawer.svg", raster_width=1200)
    write_embedded_svg(footer, BRAND_DIR / "demian-logo-footer.svg", raster_width=1600)
    write_embedded_svg(header_emblem, BRAND_DIR / "demian-emblem.svg", raster_width=800)
    save_png(header_emblem, BRAND_DIR / "demian-emblem.png")

    for size, filename in (
        (48, "favicon-48x48.png"),
        (192, "favicon-192x192.png"),
        (512, "favicon-512x512.png"),
        (180, "apple-touch-icon.png"),
    ):
        save_png(favicon.resize((size, size), RESAMPLE), PUBLIC / filename)

    favicon.save(PUBLIC / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    write_embedded_svg(favicon.resize((512, 512), RESAMPLE), PUBLIC / "favicon.svg")

    social = Image.new("RGB", (1200, 630), NAVY)
    social_lockup = contain(footer, (1080, 500))
    social.paste(
        social_lockup,
        ((social.width - social_lockup.width) // 2, (social.height - social_lockup.height) // 2),
        social_lockup,
    )
    save_png(social, BRAND_DIR / "demian-social-card.png")


if __name__ == "__main__":
    main()
