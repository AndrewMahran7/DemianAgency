import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock3, ShieldCheck } from "lucide-react";
import { ServiceRequestForm } from "@/components/demian/service-request-form";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createPageMetadata({
  title: "Request Service | Demian Insurance Agency",
  description: "Submit a policy change, document request, billing question, claim-guidance request, or other service request to Demian Insurance Agency.",
  path: "/request-service",
});

export default async function RequestServicePage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type = "" } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="request-service-page">
        <section className="request-service-hero">
          <div>
            <p className="eyebrow"><span /> Request service</p>
            <h1>Submit a service request.</h1>
          </div>
          <div>
            <p>Use this form for changes, documents, billing or policy questions, and claim guidance related to coverage you already have.</p>
            <Link className="text-link" href={siteConfig.clientServiceHref}><ArrowLeft aria-hidden="true" size={16} /> View Client Service</Link>
          </div>
        </section>

        <section className="request-service-workspace">
          <aside className="request-service-intro">
            <p className="eyebrow light"><span /> A focused first step</p>
            <h2>Tell the service team what you need.</h2>
            <p>A dedicated customer service representative will follow up within one business day with either a resolution or a request for more information, using your selected contact method.</p>
            <div className="request-service-note"><ShieldCheck aria-hidden="true" size={19} /><span>Mina is available for escalations when appropriate.</span></div>
            <div className="request-service-hours"><Clock3 aria-hidden="true" size={19} /><div><strong>Agency hours</strong><span>{siteConfig.hours[0].days}: {siteConfig.hours[0].time}<br />{siteConfig.hours[1].days}: {siteConfig.hours[1].time}</span></div></div>
          </aside>
          <div className="request-service-form"><ServiceRequestForm compact initialType={type} /></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
