import type { Metadata } from "next";
import { AgencyContactStrip } from "@/components/demian/insurance-conversion";
import { QuoteRequestForm } from "@/components/demian/quote-request-form";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Request an Insurance Quote | Demian Insurance Agency",
  description: "Request a Florida auto, home, life, or small-business insurance quote and start a personal conversation with Demian Insurance Agency.",
  path: "/request-quote",
});

export default async function RequestQuotePage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type = "" } = await searchParams;
  return (
    <>
      <SiteHeader />
      <main className="quote-page">
        <section className="quote-page-intro">
          <div>
            <p className="eyebrow"><span /> Request a quote</p>
            <h1>Start with a conversation, not a full application.</h1>
          </div>
          <p>Choose the kind of coverage you are looking for and share the best way to reach you. This focused first step gives the agency enough context to follow up without asking for sensitive application details.</p>
        </section>
        <section className="quote-page-form">
          <QuoteRequestForm initialType={type} source="request_quote" />
          <aside className="quote-side-note">
            <span>01</span>
            <h2>What happens next?</h2>
            <p>A team member will review the request and begin a personal coverage conversation. Carrier eligibility, policy terms, and available options depend on the details of each request.</p>
            <div><strong>No sensitive application data</strong><p>No Social Security number, driver&apos;s license number, banking details, medical history, or VIN is requested here.</p></div>
          </aside>
        </section>
        <AgencyContactStrip location="quote_form" />
      </main>
      <SiteFooter />
    </>
  );
}
