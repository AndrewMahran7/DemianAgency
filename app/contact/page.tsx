import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { RouteShell } from "@/components/demian/route-shell";
import { ServiceRequestForm } from "@/components/demian/service-request-form";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { TrackedPhoneLink } from "@/components/demian/analytics-link";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Demian Insurance Agency",
  description: "Call Demian Insurance Agency at (941) 377-1806 for quote or policy service help. Hours: Monday-Friday 9 AM-6 PM; Saturday 9 AM-1 PM.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <RouteShell eyebrow="Contact" title="Start with what you need." description="Call during agency hours or use the focused request form below. A real person will follow up with the next step." quoteLocation="contact">
      <div className="contact-route-layout">
        <aside className="contact-route-details">
          <Phone aria-hidden="true" size={22} />
          <span>Call the agency</span>
          <TrackedPhoneLink location="contact" href={siteConfig.phoneHref}>{siteConfig.phone}</TrackedPhoneLink>
          <p>{siteConfig.hours[0].days}: {siteConfig.hours[0].time}<br />{siteConfig.hours[1].days}: {siteConfig.hours[1].time}</p>
        </aside>
        <div className="route-form-wrap"><ServiceRequestForm compact /></div>
      </div>
    </RouteShell>
  );
}
