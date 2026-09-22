import type { Metadata } from "next";
import { RouteShell } from "@/components/demian/route-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Notice | Demian Insurance Agency",
  description: "Privacy notice information for the Demian Insurance Agency website and its insurance request forms.",
  path: "/privacy",
});

export default function PrivacyPage() { return <RouteShell eyebrow="Information" title="Privacy notice forthcoming." description="The agency's reviewed privacy notice will be published here before the service request form is connected to any live system." />; }
