import type { Metadata } from "next";
import { TrackedPhoneLink } from "@/components/demian/analytics-link";
import { LegalPage, LegalSection } from "@/components/demian/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Notice | Demian Insurance Agency",
  description: "Privacy notice information for the Demian Insurance Agency website and its insurance request forms.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Information" title="Privacy Policy" introduction="This policy explains what information this website collects, why we use it, and the choices available to you when you contact Demian Insurance Agency online.">
      <LegalSection title="Information you provide">
        <p>Our quote and service forms may collect your first and last name, email address, phone number, preferred contact method, and the insurance or service category you select. Quote requests may include an optional note. Service requests include a short description of the help needed and may also include optional additional details and a policy number.</p>
        <p>The website is designed as a first-contact experience. It does not ask you to submit a Social Security number, driver&apos;s license number, banking or payment-card information, or detailed medical history. Please do not include highly sensitive information in a general website form.</p>
      </LegalSection>
      <LegalSection title="How we use information">
        <p>We use submitted information to respond to quote requests and existing-client service requests, communicate through your preferred contact method, and provide the insurance-related assistance you requested. We may also use information as reasonably necessary to operate and secure the website and meet applicable legal or business obligations.</p>
        <p>Submitting a form does not automatically subscribe you to a marketing mailing list.</p>
      </LegalSection>
      <LegalSection title="Hosting, email, and service providers">
        <p>We use Vercel to host the website and to understand aggregate website usage and performance. We use Resend as a transactional email provider to deliver quote-request and service-request notifications to the agency and confirmation emails to customers. Form information passes through Resend for those delivery purposes.</p>
        <p>We may share information with service providers when reasonably necessary to operate the website or respond to your request. Those providers process information in connection with the services they provide.</p>
      </LegalSection>
      <LegalSection title="Website analytics">
        <p>Vercel Web Analytics helps us understand page visits, referral sources, general device and browser information, and selected website interactions or conversions. Our custom analytics events use category-level information only.</p>
        <p>Our analytics instrumentation is not designed to send names, email addresses, phone numbers, policy numbers, messages, or form contents. Vercel may process other technical information as part of providing its hosting and analytics services.</p>
      </LegalSection>
      <LegalSection title="Retention">
        <p>We retain information only as reasonably necessary to respond to the requested service, support agency operations, meet legal or regulatory obligations, and address dispute or security needs. The appropriate period depends on the information and the reason it is needed.</p>
      </LegalSection>
      <LegalSection title="Security">
        <p>We use reasonable administrative and technical measures intended to protect information, but no method of transmission or storage can be guaranteed to be completely secure.</p>
      </LegalSection>
      <LegalSection title="Your choices and questions">
        <p>You may contact us with privacy questions or requests concerning information you submitted. Email <a href="mailto:mina@demianinsurance.com">mina@demianinsurance.com</a> or call <TrackedPhoneLink location="legal" href="tel:+19413771806">(941) 377-1806</TrackedPhoneLink>.</p>
      </LegalSection>
      <LegalSection title="Children">
        <p>This website is intended for people seeking insurance services and is not directed toward children. Please contact us if you believe a child has submitted information through the website.</p>
      </LegalSection>
      <LegalSection title="Changes to this policy">
        <p>We may update this policy as the website or our practices change. The revision date at the top of this page will show when the posted policy was last updated.</p>
      </LegalSection>
    </LegalPage>
  );
}
