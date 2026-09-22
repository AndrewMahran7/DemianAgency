import { RouteShell } from "@/components/demian/route-shell";
import { ServiceRequestForm } from "@/components/demian/service-request-form";

export default function RequestServicePage() {
  return (
    <RouteShell eyebrow="Request service" title="How can we help?" description="Share a few details in this frontend-only preview. Nothing entered is sent or stored until a secure agency connection is added.">
      <div className="route-form-wrap"><ServiceRequestForm compact /></div>
    </RouteShell>
  );
}
