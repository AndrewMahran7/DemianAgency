import type { Metadata } from "next";
import { ArrowRight, CircleHelp, FileText, RefreshCcw, ShieldCheck } from "lucide-react";
import { AgencyContactStrip } from "@/components/demian/insurance-conversion";
import { MotionReveal } from "@/components/demian/motion-reveal";
import { SiteFooter } from "@/components/demian/site-footer";
import { SiteHeader } from "@/components/demian/site-header";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { TrackedLink, TrackedPhoneLink } from "@/components/demian/analytics-link";

export const metadata: Metadata = createPageMetadata({
  title: "Client Service | Demian Insurance Agency",
  description: "Policy changes, documents, billing questions, claim guidance, and service requests for existing Demian Insurance Agency clients.",
  path: "/client-service",
});

const serviceGroups = [
  {
    title: "Policy changes",
    description: "Updates to the people, vehicles, property details, or interests listed on a policy.",
    items: ["Add or remove a vehicle", "Add or remove a driver", "Update an address", "Mortgage or lienholder change"],
    href: "/request-service?type=Policy%20change",
    icon: RefreshCcw,
  },
  {
    title: "Documents",
    description: "Ask the service team for common proof-of-coverage and policy documents.",
    items: ["ID cards", "Proof of insurance", "Policy documents", "Certificates"],
    href: "/request-service?type=Documents%20%2F%20proof",
    icon: FileText,
  },
  {
    title: "Policy questions",
    description: "Start a conversation about an existing policy, bill, renewal, or coverage question.",
    items: ["Billing", "Coverage questions", "Renewal questions", "General policy help"],
    href: "/request-service?type=Billing%20%2F%20question",
    icon: CircleHelp,
  },
  {
    title: "Claim guidance",
    description: "Get help identifying the appropriate carrier contact and what information to have ready.",
    items: ["Carrier contact direction", "Information to gather", "Existing-claim questions", "Agency guidance"],
    href: "/request-service?type=Claims%20help",
    icon: ShieldCheck,
  },
] as const;

export default function ClientServicePage() {
  return (
    <>
      <SiteHeader />
      <main className="client-service-page">
        <section className="client-service-hero">
          <MotionReveal immediate>
            <p className="eyebrow"><span /> Client service</p>
            <h1>Help with the policy you already have.</h1>
          </MotionReveal>
          <MotionReveal className="client-service-hero-aside" delay={0.08} immediate>
            <p>Whether you need to make a change, request documents, ask a question, or get help with a claim, the Demian customer service team is here to help.</p>
            <div className="client-service-hero-actions">
              <TrackedLink event="service_cta_click" properties={{ location: "client_service" }} className="button" href={siteConfig.requestServiceHref}>Request Service <ArrowRight aria-hidden="true" size={18} /></TrackedLink>
              <TrackedPhoneLink location="client_service" className="text-link" href={siteConfig.phoneHref}>Call {siteConfig.phone} <span aria-hidden="true">↗</span></TrackedPhoneLink>
            </div>
          </MotionReveal>
        </section>

        <section className="client-service-actions" aria-labelledby="service-actions-heading">
          <MotionReveal className="client-service-actions-heading">
            <p className="eyebrow"><span /> Find the right next step</p>
            <h2 id="service-actions-heading">What can we help with?</h2>
            <p>Choose the closest category. Each option opens the service form with a helpful starting point; no request is sent until you review and submit the form.</p>
          </MotionReveal>
          <div className="client-service-grid">
            {serviceGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <MotionReveal delay={index * 0.05} key={group.title}>
                  <TrackedLink event="service_cta_click" properties={{ location: "client_service" }} className="client-service-card" href={group.href}>
                    <div className="client-service-card-top"><Icon aria-hidden="true" size={21} /><span>0{index + 1}</span></div>
                    <div><h3>{group.title}</h3><p>{group.description}</p></div>
                    <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    <span className="client-service-card-action">Start this request <ArrowRight aria-hidden="true" size={17} /></span>
                  </TrackedLink>
                </MotionReveal>
              );
            })}
          </div>
        </section>

        <section className="client-service-response">
          <MotionReveal>
            <p className="eyebrow light"><span /> What to expect</p>
            <h2>A clear response within one business day.</h2>
          </MotionReveal>
          <MotionReveal className="client-service-response-copy" delay={0.08}>
            <p>A dedicated customer service representative will follow up using your selected communication method with either a resolution or a request for additional information.</p>
            <p>Routine service is handled by the customer service team. Mina handles escalations when appropriate.</p>
            <TrackedLink event="service_cta_click" properties={{ location: "client_service" }} className="button button-light" href={siteConfig.requestServiceHref}>Submit a Service Request <ArrowRight aria-hidden="true" size={18} /></TrackedLink>
          </MotionReveal>
        </section>

        <AgencyContactStrip location="client_service" />
      </main>
      <SiteFooter />
    </>
  );
}
