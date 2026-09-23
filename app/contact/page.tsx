import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { RouteShell } from "@/components/demian/route-shell";
import { ServiceRequestForm } from "@/components/demian/service-request-form";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { TrackedPhoneLink } from "@/components/demian/analytics-link";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Demian Insurance Agency | Florida",
  description: "Call Demian Insurance Agency or send a request for personal help with Florida insurance quotes, policy service, or claims guidance.",
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
