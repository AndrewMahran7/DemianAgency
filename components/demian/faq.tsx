"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  ["What types of insurance can Demian help with?", "The agency is structured to help with auto, home, life, and business insurance, as well as questions about existing policies."],
  ["What should I include in a service request?", "Share what you need help with and the best way to reach you. If your request concerns an existing policy, include the policy number when available."],
  ["Can I request help with an existing policy?", "Yes. You can use the service request for policy changes, billing questions, claims help, and other existing-policy needs."],
  ["How will the agency contact me?", "Choose phone, email, or text as your preferred contact method. A dedicated customer service representative will follow up within one business day with a resolution or a request for more information."],
] as const;

export function FAQ() {
  return (
    <Accordion className="faq-list" type="single" collapsible>
      {faqs.map(([question, answer], index) => (
        <AccordionItem className="faq-item" key={question} value={`item-${index}`}>
          <AccordionTrigger className="faq-trigger"><span>0{index + 1}</span>{question}</AccordionTrigger>
          <AccordionContent className="faq-content">{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
