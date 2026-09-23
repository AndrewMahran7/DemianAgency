import type { Metadata } from "next";
import { RouteShell } from "@/components/demian/route-shell";
import { TrackedLink } from "@/components/demian/analytics-link";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Claims & Insurance Resources | Demian Insurance Agency",
  description: "Find clear next steps for insurance claim guidance, policy documents, and verified carrier resources from Demian Insurance Agency.",
  path: "/claims-resources",
});

export default function ResourcesPage() {
  return (
    <RouteShell eyebrow="Claims & resources" title="Clear next steps when you need them." description="This resource hub is reserved for verified claims contacts, carrier links, document guidance, and policy resources. No unconfirmed instructions are shown." quoteLocation="claims_resources">
      <div className="resource-next-step">
        <p>Need help now? Start a service request so the agency can identify the appropriate carrier contact and help you understand what information to have ready.</p>
        <TrackedLink event="service_cta_click" properties={{ location: "claims_resources" }} className="text-link" href="/request-service?type=Claims%20help">Request Claim Guidance <span aria-hidden="true">↗</span></TrackedLink>
      </div>
    </RouteShell>
  );
}
