import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { AnalyticsEventMap } from "@/lib/analytics";
import { TrackedLink } from "./analytics-link";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function RouteShell({ eyebrow, title, description, quoteLocation, children }: {
  eyebrow: string;
  title: string;
  description: string;
  quoteLocation: AnalyticsEventMap["quote_cta_click"]["location"];
  children?: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="route-main">
        <section className="route-hero">
          <div><p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1></div>
          <div><p>{description}</p><TrackedLink event="quote_cta_click" properties={{ location: quoteLocation }} className="button" href={siteConfig.requestQuoteHref}>Request a Quote <ArrowRight aria-hidden="true" size={18} /></TrackedLink></div>
        </section>
        {children && <section className="route-content">{children}</section>}
      </main>
      <SiteFooter />
    </>
  );
}
