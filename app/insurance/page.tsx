import { InsuranceServices } from "@/components/demian/insurance-services";
import { RouteShell } from "@/components/demian/route-shell";

export default function InsurancePage() {
  return <RouteShell eyebrow="Insurance" title="Coverage for the full picture." description="Explore personal guidance across auto, home, life, and business insurance. Each page is ready for confirmed carrier and coverage details."><InsuranceServices /></RouteShell>;
}
