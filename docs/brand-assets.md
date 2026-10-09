# Demian brand assets

## Source of truth

The official source supplied for this site is archived at:

- `assets/brand/Demian Logo.pdf`
- SHA-256: `A5740CC3291ED707F3E4F44C12B9ACD2E25C5B9BFF9F3064E79DDD0C9AE3DB57`

The PDF contains one flattened 3600 × 1500 JPEG. It does not contain editable
vector artwork. Its navy background (`#1E3A5F`) is baked into the source image,
so the web assets intentionally retain that background instead of using a
destructive background-removal or tracing process.

## Derived web assets

- `public/images/brand/demian-logo-horizontal.png` — compact header/navigation
  lockup. It recomposes unmodified source regions and omits only the tagline.
- `public/images/brand/demian-logo-full.png` — complete logo and tagline for the
  footer and other spacious placements.
- `public/images/brand/demian-emblem.png` — square coastal emblem for structured
  data and icon generation.
- `public/images/brand/demian-social-card.png` — 1200 × 630 Open Graph/Twitter
  image using the complete official lockup.
- `public/images/brand/demian-social-card.svg` — raster-backed SVG counterpart
  retained for compatibility with the existing asset set.
- `public/favicon.svg`, `public/favicon.ico`, `public/favicon-48x48.png`,
  `public/favicon-192x192.png`, `public/favicon-512x512.png`, and
  `public/apple-touch-icon.png` — emblem-derived browser and install icons.

The SVG files are raster-backed because the supplied official artwork is
raster-only. They should not be described or distributed as vector originals.

## Regenerating assets

Install the two asset-generation dependencies in a local Python environment,
then run the generator from the repository root:

```powershell
python -m pip install pymupdf pillow
python scripts/generate-brand-assets.py
```

The generator validates the expected source dimensions and background color
before writing any derived assets. It does not run during the application build
and does not add a Python runtime requirement to the deployed site.
