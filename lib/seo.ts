import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const rawSiteUrl = process.env.SITE_URL?.trim();

function getVerifiedSiteUrl(value?: string) {
  if (!value) return null;

  try {
    const url = new URL(value);
    const blockedHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

    if (!(["http:", "https:"].includes(url.protocol)) || blockedHosts.has(url.hostname)) return null;

    url.pathname = "/";
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

export const siteUrl = getVerifiedSiteUrl(rawSiteUrl);

export const publicRoutes = [
  "/",
  "/insurance",
  "/insurance/auto",
  "/insurance/home",
  "/insurance/life",
  "/insurance/business",
  "/about",
  "/about/team",
  "/request-quote",
  "/client-service",
  "/request-service",
  "/claims-resources",
  "/contact",
  "/privacy",
  "/terms",
] as const;

type PageMetadata = {
  title: string;
  description: string;
  path: (typeof publicRoutes)[number];
  image?: string;
};

export function absoluteUrl(path: string) {
  return siteUrl ? new URL(path, siteUrl).toString() : undefined;
}

export function createPageMetadata({ title, description, path, image }: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = image ? absoluteUrl(image) : undefined;

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteConfig.businessName,
      ...(canonical ? { url: canonical } : {}),
      ...(socialImage ? { images: [{ url: socialImage }] } : {}),
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
  };
}

const areaServed = siteConfig.serviceAreas.map((county) => ({
  "@type": "AdministrativeArea",
  name: `${county} County, Florida`,
}));

export function createAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: siteConfig.businessName,
    telephone: "+19413771806",
    founder: {
      "@type": "Person",
      name: "Mina Demian",
      honorificSuffix: "CSFS®",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    areaServed,
    makesOffer: ["Auto insurance", "Home insurance", "Life insurance", "Business insurance"].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
    ...(siteUrl ? { url: siteUrl.toString() } : {}),
  };
}

export function createInsuranceServiceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    provider: {
      "@type": "InsuranceAgency",
      name: siteConfig.businessName,
      telephone: "+19413771806",
    },
    areaServed,
    ...(absoluteUrl(path) ? { url: absoluteUrl(path) } : {}),
  };
}
