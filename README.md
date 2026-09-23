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

## Vercel deployment

This project deploys through Vinext's Vite + Nitro adapter; it is not a stock Next.js `.next` deployment. In the Vercel project settings use:

- Framework Preset: `Other`
- Root Directory: `.`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: leave blank (Nitro writes `.vercel/output`)
- Node.js Version: `22.x`
- Environment variable: `SITE_URL=https://demianinsurance.com`

Use the standard `npm ci` install command on Vercel. The `install:ci` script is retained only for the local Sites execution workflow and is not part of the Vercel path.

Vercel sets `VERCEL=1` automatically, which selects the Vite + Nitro build path. `NITRO_PRESET=vercel` is not required in Vercel. No `vercel.json` file or production deploy command is needed.

The production Demian Insurance Agency site is a commercial business website and should use an appropriate Vercel commercial plan.

## Analytics

Production uses Vercel Web Analytics for page traffic and a small set of non-PII conversion events. In Vercel, open **Project → Analytics → Enable Web Analytics**, then redeploy. Page views and traffic sources appear in the Analytics dashboard; conversion activity appears under custom events. Ordinary use does not require an analytics API token. Custom events require a Vercel plan that supports them.

The tracked event properties are limited to predefined locations, form sources, insurance/service categories, and broad error categories. Names, email addresses, phone numbers, policy numbers, messages, and form payloads must never be added to analytics events.

## Transactional form email

Quote and service requests are delivered through Resend. The agency notification is sent first and is the critical operation: the website only shows a received state after that email succeeds. The customer confirmation is attempted second; if it fails after the agency notification succeeds, the submission remains successful so the customer is not encouraged to create a duplicate request.

Production setup:

1. Create or connect a Resend account.
2. Add and verify `demianinsurance.com` in Resend.
3. Add the exact DNS records Resend provides to the domain, then wait for Resend to report the domain as verified. Do not guess or substitute DNS values.
4. Create a production Resend API key.
5. In Vercel, open **Settings → Environment Variables** and add:
   - `RESEND_API_KEY=<secret>`
   - `AGENCY_INBOX=mina.demian@demianinsurance.com`
   - `EMAIL_FROM=Demian Insurance Agency <forms@demianinsurance.com>`
   - `SITE_URL=https://demianinsurance.com`
6. Redeploy so the deployment receives the new environment variables.

`RESEND_API_KEY` is server-only and must never use a `NEXT_PUBLIC_` prefix. For local provider testing, explicitly set `EMAIL_FROM` to a sender permitted by your Resend account; the application never falls back to a development sender or fake success. The forms render without email configuration, but a submission fails safely until all four values are present. Add Vercel-level rate limiting or Turnstile later if observed abuse warrants it; the initial implementation uses server validation, a small request-body limit, and a honeypot without storing form data.

## Quality checks

```bash
npm ci
npm run test:forms
npx tsc --noEmit
npm run lint
npm run build
```

The agency office address and remaining line-specific photography are intentionally pending. The Privacy Policy and Website Terms are practical drafts and should receive owner and legal review before they are treated as final legal advice.
