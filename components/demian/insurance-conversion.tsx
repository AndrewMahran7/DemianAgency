import { ArrowRight, Clock3, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { TrackedLink, TrackedPhoneLink } from "./analytics-link";
import type { QuoteSubmission } from "@/lib/forms/validation";

export function QuoteActions({ label, line }: { label: string; line?: QuoteSubmission["insuranceType"] }) {
  const href = line ? `${siteConfig.requestQuoteHref}?type=${encodeURIComponent(line)}` : siteConfig.requestQuoteHref;
  const location = line ? `${line.toLowerCase()}_page` as "auto_page" | "home_page" | "life_page" | "business_page" : "insurance_page";
  return (
    <div className="quote-actions">
      <TrackedLink event="quote_cta_click" properties={{ location, ...(line ? { insuranceType: line } : {}) }} className="button" href={href}>{label}<ArrowRight aria-hidden="true" size={18} /></TrackedLink>
      <TrackedLink event="service_cta_click" properties={{ location: "insurance_page" }} className="text-link" href={siteConfig.requestServiceHref}>Already a client? Request Service <span aria-hidden="true">↗</span></TrackedLink>
    </div>
  );
}

export function ExistingCustomerCTA() {
  return (
    <aside className="existing-customer-cta" aria-label="Existing customer service">
      <div className="existing-customer-copy">
        <p className="eyebrow light"><span /> Already a client?</p>
        <h2>We&apos;re here after the policy is written.</h2>
        <p>Need to make a change, ask a coverage question, request documents, or get help with an existing policy? A member of the Demian customer service team will follow up within one business day.</p>
        <div className="existing-customer-actions">
          <TrackedLink event="service_cta_click" properties={{ location: "insurance_page" }} className="button button-light" href={siteConfig.requestServiceHref}>Request Service <ArrowRight aria-hidden="true" size={18} /></TrackedLink>
          <TrackedPhoneLink location="insurance_page" className="existing-customer-phone" href={siteConfig.phoneHref}><Phone aria-hidden="true" size={17} /> Call {siteConfig.phone}</TrackedPhoneLink>
        </div>
        <p className="existing-customer-hours">{siteConfig.hours[0].days}, {siteConfig.hours[0].time} · {siteConfig.hours[1].days}, {siteConfig.hours[1].time}</p>
      </div>
      <ul className="existing-customer-topics" aria-label="Common service requests">
        <li>Policy changes</li>
        <li>Billing questions</li>
        <li>Documents</li>
        <li>Claim guidance</li>
      </ul>
    </aside>
  );
}

export function AgencyContactStrip({ location = "insurance_page" }: { location?: "insurance_page" | "client_service" | "quote_form" }) {
  return (
    <aside className="agency-contact-strip" aria-label="Agency phone and business hours">
      <div className="contact-strip-intro"><span>Prefer to talk?</span><strong>A live person is available during agency hours.</strong></div>
      <TrackedPhoneLink location={location} href={siteConfig.phoneHref}><Phone aria-hidden="true" size={19} /><span>Call the agency</span><strong>{siteConfig.phone}</strong></TrackedPhoneLink>
      <div className="contact-hours"><Clock3 aria-hidden="true" size={19} /><span>Business hours</span><strong>{siteConfig.hours[0].days}: {siteConfig.hours[0].time}<br />{siteConfig.hours[1].days}: {siteConfig.hours[1].time}</strong></div>
    </aside>
  );
}
