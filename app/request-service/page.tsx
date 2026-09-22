import type { Metadata } from "next";
import { RouteShell } from "@/components/demian/route-shell";
import { ServiceRequestForm } from "@/components/demian/service-request-form";

export const metadata: Metadata = {
  title: "Request Service | Demian Insurance Agency",
  description: "Request help with an existing Demian Insurance Agency policy or service question.",
};

export default function RequestServicePage() {
  return (
    <RouteShell eyebrow="Existing customers" title="How can we help?" description="Share a policy question, change, or request. A dedicated customer service representative will follow up within one business day with a resolution or a request for more information using your selected contact method.">
      <div className="route-form-wrap"><ServiceRequestForm compact /></div>
    </RouteShell>
  );
}
