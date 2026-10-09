# Demian brand assets

## Official source

The official source supplied for this site is archived at:

- `assets/brand/Demian Logo.pdf`
- SHA-256: `A5740CC3291ED707F3E4F44C12B9ACD2E25C5B9BFF9F3064E79DDD0C9AE3DB57`

The PDF contains one flattened 3600 x 1500 JPEG and no editable vector paths.
Its official navy canvas (`#1E3A5F`) is baked into the JPEG. The derived SVGs
are therefore raster-backed transparent wrappers; they preserve the official
source silhouettes and must not be described or distributed as vector
originals.

The generator recovers the artwork's original opacity by comparing source
pixels with the official ivory, gray-blue, and gold families composited over
the sampled navy. It then maps those same source shapes to the appropriate web
surface. It does not substitute fonts, trace letterforms, or redraw the mark.

## Header variant

- `public/images/brand/demian-logo-header.svg` - transparent navy-and-gold
  lockup for wide ivory headers, including the approved tagline.
- `public/images/brand/demian-logo-header-compact.svg` - transparent compact
  lockup without the tagline for tablet and mobile headers.
- `public/images/brand/demian-logo-drawer.svg` - transparent reversed compact
  lockup for the dark mobile navigation drawer.

## Footer variant

- `public/images/brand/demian-logo-footer.svg` - transparent complete reversed
  lockup for the dark navy footer. Ivory, gray-blue, and gold roles follow the
  supplied artwork.

## Emblem

- `public/images/brand/demian-emblem.svg` - transparent navy-and-gold coastal
  emblem for light surfaces.
- `public/images/brand/demian-emblem.png` - 1024 x 1024 transparent PNG
  counterpart.

## Favicon

The favicon uses only the official coastal emblem. The reversed emblem sits on
an intentional circular `#1E3A5F` field so it remains recognizable on both
light and dark browser chrome. Generated derivatives are:

- `public/favicon.svg`
- `public/favicon.ico` (16, 32, and 48 px)
- `public/favicon-48x48.png`
- `public/favicon-192x192.png`
- `public/favicon-512x512.png`
- `public/apple-touch-icon.png` (180 x 180)

The 192 and 512 px PNGs are referenced by `public/site.webmanifest`.
Structured data uses the stable production URL
`https://demianinsurance.com/favicon-512x512.png`.

## Social card

- `public/images/brand/demian-social-card.png` - 1200 x 630 Open Graph/Twitter
  image using the transparent reversed lockup on the official navy.

## Tagline

The approved wording is:

`Family owned · Serving Southwest Florida`

It appears in the wide desktop header and the full footer lockup. The compact
header and mobile navigation variants omit it to preserve legibility.

## Regenerating assets

Install the asset-generation dependencies in a local Python environment, then
run the generator from the repository root:

```powershell
python -m pip install pymupdf pillow numpy
python scripts/generate-brand-assets.py
```

The generator validates the expected source dimensions and background color
before writing derived assets. It does not run during the application build
and adds no Python requirement to the deployed site.
