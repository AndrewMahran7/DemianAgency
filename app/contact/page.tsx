import { RouteShell } from "@/components/demian/route-shell";
import { ServiceRequestForm } from "@/components/demian/service-request-form";
export default function ContactPage() { return <RouteShell eyebrow="Contact" title="Start with what you need." description="Use the frontend-only request experience below. Contact details and office information will appear here once the agency confirms them."><div className="route-form-wrap"><ServiceRequestForm compact /></div></RouteShell>; }
