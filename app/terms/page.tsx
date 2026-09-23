import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/demian/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Website Terms | Demian Insurance Agency",
  description: "Website terms information for Demian Insurance Agency and its online insurance request experience.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Information" title="Website Terms of Use" introduction="These terms explain the role of this website and what happens when you request a quote, service, or other assistance from Demian Insurance Agency online.">
      <LegalSection title="Website purpose">
        <p>This website provides general information about Demian Insurance Agency, allows visitors to request insurance quotes, lets existing customers request service, and provides ways to contact the agency. Website content is informational and may change.</p>
      </LegalSection>
      <LegalSection title="Website requests do not create or change coverage">
        <p>Submitting a quote form does not create or bind insurance coverage. Submitting a service request does not, by itself, bind, modify, cancel, renew, or otherwise change a policy. Coverage or policy changes become effective only when confirmed through appropriate authorized channels and insurance documentation.</p>
        <p>Your actual policy documents and applicable carrier terms control the scope, limits, conditions, and exclusions of coverage.</p>
      </LegalSection>
      <LegalSection title="Quotes and availability">
        <p>A quote request is a request for follow-up. Availability, eligibility, pricing, policy terms, discounts, and coverage depend on the applicable insurer, underwriting, policy, and individual circumstances. Website content is not a guarantee of price, eligibility, savings, or coverage.</p>
      </LegalSection>
      <LegalSection title="Content and insurance guidance">
        <p>We make reasonable efforts to keep website content useful and accurate, but insurance products and availability may change. The website does not replace actual policy documentation. Contact the agency for guidance about your specific insurance questions.</p>
        <p>General website content is not legal, tax, accounting, or investment advice.</p>
      </LegalSection>
      <LegalSection title="Emergencies and claims">
        <p>Do not rely on website forms for an emergency. For an urgent threat to safety, use the appropriate emergency services. For a claim, follow the applicable carrier and agency claims procedures; a general website submission is not a substitute for required claim notice.</p>
      </LegalSection>
      <LegalSection title="Information you submit">
        <p>Please provide information you reasonably believe is accurate. Avoid sending highly sensitive information through general website forms unless the agency specifically requests it through an appropriate secure process.</p>
      </LegalSection>
      <LegalSection title="Third-party services and links">
        <p>The website may use or link to third-party services and resources. Those external services operate under their own terms and practices, and Demian Insurance Agency does not control their websites.</p>
      </LegalSection>
      <LegalSection title="Intellectual property">
        <p>The website&apos;s original branding, design, text, graphics, and other site content are protected as applicable. This statement does not claim ownership of third-party marks or materials.</p>
      </LegalSection>
      <LegalSection title="Availability and responsibility">
        <p>The site is provided for informational and service-request purposes. Availability may occasionally be interrupted, and we do not guarantee that every feature will always operate without delay or error. Insurance outcomes are governed by actual policies, carriers, underwriting decisions, and applicable terms—not by general website content.</p>
      </LegalSection>
      <LegalSection title="Changes and contact">
        <p>We may update these terms by posting a revised version and changing the date shown above. Questions may be sent to <a href="mailto:mina.demian@demianinsurance.com">mina.demian@demianinsurance.com</a> or directed to <a href="tel:+19413771806">(941) 377-1806</a>.</p>
      </LegalSection>
    </LegalPage>
  );
}
