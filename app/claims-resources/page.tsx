import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RouteShell } from "@/components/demian/route-shell";
import { TrackedLink } from "@/components/demian/analytics-link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Claims Help & Resources | Demian Insurance Agency",
  description: "Need help with an insurance claim? Ask the Demian team for carrier contact guidance, information to gather, and next steps for an existing claim.",
  path: "/claims-resources",
});

export default function ResourcesPage() {
  return (
    <RouteShell
      eyebrow="Claims & resources"
      title="Clear next steps when you need them."
      description="The Demian team can help you find the right carrier contact, understand what information to gather, and identify your next step. Claim decisions remain with your carrier."
      mainClassName="claims-page"
      heroActions={(
        <div className="claims-hero-actions">
          <TrackedLink event="service_cta_click" properties={{ location: "claims_hero" }} className="button" href="/request-service?type=Claims%20help">
            Request Claim Guidance <ArrowRight aria-hidden="true" size={18} />
          </TrackedLink>
          <Link className="text-link" href="/client-service">Client Service <span aria-hidden="true">↗</span></Link>
        </div>
      )}
    >
      <div className="claims-guidance-panel">
        <div className="claims-guidance-copy">
          <p className="eyebrow"><span />Need help with a claim?</p>
          <h2>Have the basics ready.</h2>
          <p>Your policy number, the date of the incident, and a brief description will help the team direct you. If you already reported the claim, have your claim number and any carrier correspondence available.</p>
          <p>Requesting guidance through this website does not report a claim to your carrier. Follow the claim-reporting instructions in your policy. For an urgent threat to safety, contact emergency services.</p>
        </div>
      </div>
    </RouteShell>
  );
}
