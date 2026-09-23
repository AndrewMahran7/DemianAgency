import { track } from "@vercel/analytics/react";
import type { QuoteSubmission, ServiceSubmission } from "@/lib/forms/validation";

type QuoteInsuranceType = QuoteSubmission["insuranceType"];
type ServiceRequestType = ServiceSubmission["requestType"];

export type AnalyticsEventMap = {
  quote_cta_click: {
    location: "header" | "footer" | "homepage_hero" | "insurance_page" | "auto_page" | "home_page" | "life_page" | "business_page" | "team_page" | "about_page" | "contact" | "claims_resources" | "not_found";
    insuranceType?: QuoteInsuranceType;
  };
  quote_form_start: { source: "homepage" | "request_quote" };
  quote_submission_success: { insuranceType: QuoteInsuranceType };
  quote_submission_error: { category: "validation" | "delivery" | "network" };
  service_cta_click: { location: "header" | "homepage_hero" | "insurance_page" | "client_service" | "claims_resources" | "footer" };
  service_submission_success: { requestType: ServiceRequestType };
  phone_click: { location: "homepage" | "quote_form" | "client_service" | "insurance_page" | "footer" | "contact" };
  meet_team_click: { location: "homepage" };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

export function trackEvent<Event extends AnalyticsEventName>(event: Event, properties: AnalyticsEventMap[Event]) {
  try {
    track(event, properties);
  } catch {
    // Analytics is intentionally secondary to navigation and form delivery.
  }
}
