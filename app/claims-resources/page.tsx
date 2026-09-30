import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RouteShell } from "@/components/demian/route-shell";
import { TrackedLink } from "@/components/demian/analytics-link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Claims & Resources | Demian Insurance Agency",
  description: "Request claim guidance, find policy resources, and get existing-customer support from Demian Insurance Agency.",
  path: "/claims-resources",
});

export default function ResourcesPage() {
  return (
    <RouteShell
      eyebrow="Claims & resources"
      title="Clear next steps when you need them."
      description="Carrier claim contacts and policy resources are being verified before they appear here. If you need help now, the Demian team can help identify the appropriate next step and what information may be useful to have ready."
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
          <h2>Start with the Demian team.</h2>
          <p>A member of the agency can help identify the appropriate carrier contact and what information may be useful to have ready.</p>
        </div>
        <div className="claims-guidance-actions">
          <TrackedLink event="service_cta_click" properties={{ location: "claims_guidance" }} className="button" href="/request-service?type=Claims%20help">
            Request Claim Guidance <ArrowRight aria-hidden="true" size={18} />
          </TrackedLink>
          <Link className="text-link" href="/client-service">Client Service <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </RouteShell>
  );
}
