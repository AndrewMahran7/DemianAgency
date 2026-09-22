import Link from "next/link";
import { ArrowRight, Clock3, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function QuoteActions({ label, line }: { label: string; line?: string }) {
  const href = line ? `${siteConfig.requestQuoteHref}?type=${encodeURIComponent(line)}` : siteConfig.requestQuoteHref;
  return (
    <div className="quote-actions">
      <Link className="button" href={href}>{label}<ArrowRight aria-hidden="true" size={18} /></Link>
      <Link className="text-link" href={siteConfig.requestServiceHref}>Already a client? Request Service <span aria-hidden="true">↗</span></Link>
    </div>
  );
}

export function ExistingCustomerCTA() {
  return (
    <aside className="existing-customer-cta" aria-label="Existing customer service">
      <div>
        <p className="eyebrow"><span /> Already insured with Demian?</p>
        <h2>Questions and changes deserve a clear response.</h2>
      </div>
      <div>
        <p>A dedicated customer service representative will follow up within one business day with a resolution or a request for more information, using your selected contact method. Mina is available for escalations when needed.</p>
        <Link className="button button-light" href={siteConfig.requestServiceHref}>Request Service <ArrowRight aria-hidden="true" size={18} /></Link>
      </div>
    </aside>
  );
}

export function AgencyContactStrip() {
  return (
    <aside className="agency-contact-strip" aria-label="Agency phone and business hours">
      <div className="contact-strip-intro"><span>Prefer to talk?</span><strong>A live person is available during agency hours.</strong></div>
      <a href={siteConfig.phoneHref}><Phone aria-hidden="true" size={19} /><span>Call the agency</span><strong>{siteConfig.phone}</strong></a>
      <div className="contact-hours"><Clock3 aria-hidden="true" size={19} /><span>Business hours</span><strong>{siteConfig.hours[0].days}: {siteConfig.hours[0].time}<br />{siteConfig.hours[1].days}: {siteConfig.hours[1].time}</strong></div>
    </aside>
  );
}
