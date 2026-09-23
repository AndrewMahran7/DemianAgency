import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/demian/analytics-link";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";

export const metadata: Metadata = {
  title: "Page Not Found | Demian Insurance Agency",
  description: "The requested page could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found-page">
        <p className="eyebrow"><span /> 404 / Page not found</p>
        <h1>This page has moved beyond the map.</h1>
        <p>The page you requested is not available. Return home, explore insurance options, or begin a quote conversation.</p>
        <div className="not-found-actions">
          <Link className="button" href="/">Return Home <ArrowRight aria-hidden="true" size={18} /></Link>
          <Link className="text-link" href="/insurance">Explore Insurance <span aria-hidden="true">↗</span></Link>
          <TrackedLink event="quote_cta_click" properties={{ location: "not_found" }} className="text-link" href="/request-quote">Request a Quote <span aria-hidden="true">↗</span></TrackedLink>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
