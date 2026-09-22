# Demian Insurance Agency

Frontend foundation for Demian Insurance Agency, serving Florida's Gulf Coast and nearby inland counties.

## Stack

- Next.js App Router API via Vinext
- React 19 and TypeScript
- Tailwind CSS v4
- shadcn/ui primitives
- Motion for React
- Lucide icons

## Local development

```bash
npm install
npm run dev
```

## Production site URL

Set `SITE_URL` to the verified production origin at build time. When it is present, the site emits absolute canonical URLs, page URLs and images in social metadata, and a populated sitemap. When it is absent or points to a local host, those absolute URL fields are omitted and `/sitemap.xml` is intentionally empty; no localhost or preview origin is used as a public URL.

```powershell
$env:SITE_URL = "<verified-production-origin>"
npm run build
```

## Quality checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```

The service-request form is an isolated frontend simulation. It does not send or store information. The agency email, office address, license-display information, remaining line-specific photography, final legal copy, and a secure submission endpoint are intentionally pending.
