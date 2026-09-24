export const quoteInsuranceTypes = ["Auto", "Home", "Life", "Business"] as const;
export const preferredContactMethods = ["phone", "email", "text"] as const;
export const serviceRequestTypes = [
  "Auto",
  "Home",
  "Life",
  "Business",
  "Claims help",
  "Policy change",
  "Documents / proof",
  "Billing / question",
  "New coverage",
  "Other",
] as const;

export type QuoteSubmission = {
  insuranceType: (typeof quoteInsuranceTypes)[number];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: (typeof preferredContactMethods)[number];
  notes: string;
};

export type ServiceSubmission = {
  requestType: (typeof serviceRequestTypes)[number];
  help: string;
  policy: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: (typeof preferredContactMethods)[number];
  details: string;
};

type ValidationResult<T> =
  | { kind: "valid"; value: T }
  | { kind: "invalid"; fieldErrors: Record<string, string> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeSingleLine(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeMultiline(value: string) {
  return value.replace(/\r\n?/g, "\n").trim();
}

function stringValue(
  input: Record<string, unknown>,
  key: string,
  errors: Record<string, string>,
  options: { label: string; max: number; required?: boolean; min?: number; multiline?: boolean },
) {
  const raw = input[key];
  if (typeof raw !== "string") {
    errors[key] = `${options.label} is required.`;
    return "";
  }
  const value = options.multiline ? normalizeMultiline(raw) : normalizeSingleLine(raw);
  if (options.required && !value) errors[key] = `${options.label} is required.`;
  else if (options.min && value.length < options.min) errors[key] = `${options.label} is too short.`;
  else if (value.length > options.max) errors[key] = `${options.label} is too long.`;
  return value;
}

function rejectUnexpectedFields(input: Record<string, unknown>, allowed: readonly string[], errors: Record<string, string>) {
  if (Object.keys(input).some((key) => !allowed.includes(key))) {
    errors.form = "The request contains unsupported fields.";
  }
}

export function validateQuoteSubmission(input: unknown): ValidationResult<QuoteSubmission> {
  if (!isRecord(input)) return { kind: "invalid", fieldErrors: { form: "Submit a valid request." } };

  const errors: Record<string, string> = {};
  rejectUnexpectedFields(input, ["insuranceType", "firstName", "lastName", "email", "phone", "contactMethod", "notes"], errors);

  const insuranceType = stringValue(input, "insuranceType", errors, { label: "Insurance type", max: 100, required: true });
  const firstName = stringValue(input, "firstName", errors, { label: "First name", max: 100, required: true });
  const lastName = stringValue(input, "lastName", errors, { label: "Last name", max: 100, required: true });
  const email = stringValue(input, "email", errors, { label: "Email", max: 254, required: true }).toLowerCase();
  const phone = stringValue(input, "phone", errors, { label: "Phone", max: 50, required: true });
  const contactMethod = stringValue(input, "contactMethod", errors, { label: "Preferred contact method", max: 100, required: true }).toLowerCase();
  const notes = stringValue(input, "notes", errors, { label: "Message", max: 3000, multiline: true });

  if (insuranceType && !quoteInsuranceTypes.includes(insuranceType as QuoteSubmission["insuranceType"])) errors.insuranceType = "Choose a valid insurance type.";
  if (email && !emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (phone && phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a valid phone number.";
  if (contactMethod && !preferredContactMethods.includes(contactMethod as QuoteSubmission["contactMethod"])) errors.contactMethod = "Choose a valid contact method.";

  if (Object.keys(errors).length) return { kind: "invalid", fieldErrors: errors };
  return { kind: "valid", value: { insuranceType: insuranceType as QuoteSubmission["insuranceType"], firstName, lastName, email, phone, contactMethod: contactMethod as QuoteSubmission["contactMethod"], notes } };
}

export function validateServiceSubmission(input: unknown): ValidationResult<ServiceSubmission> {
  if (!isRecord(input)) return { kind: "invalid", fieldErrors: { form: "Submit a valid request." } };

  const errors: Record<string, string> = {};
  rejectUnexpectedFields(input, ["requestType", "help", "policy", "firstName", "lastName", "email", "phone", "contactMethod", "details"], errors);

  const requestType = stringValue(input, "requestType", errors, { label: "Request type", max: 100, required: true });
  const help = stringValue(input, "help", errors, { label: "Request details", max: 3000, min: 10, required: true, multiline: true });
  const policy = stringValue(input, "policy", errors, { label: "Policy number", max: 100 });
  const firstName = stringValue(input, "firstName", errors, { label: "First name", max: 100, required: true });
  const lastName = stringValue(input, "lastName", errors, { label: "Last name", max: 100, required: true });
  const email = stringValue(input, "email", errors, { label: "Email", max: 254, required: true }).toLowerCase();
  const phone = stringValue(input, "phone", errors, { label: "Phone", max: 50, required: true });
  const contactMethod = stringValue(input, "contactMethod", errors, { label: "Preferred contact method", max: 100, required: true }).toLowerCase();
  const details = stringValue(input, "details", errors, { label: "Additional details", max: 3000, multiline: true });

  if (requestType && !serviceRequestTypes.includes(requestType as ServiceSubmission["requestType"])) errors.requestType = "Choose a valid request type.";
  if (email && !emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (phone && phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a valid phone number.";
  if (contactMethod && !preferredContactMethods.includes(contactMethod as ServiceSubmission["contactMethod"])) errors.contactMethod = "Choose a valid contact method.";

  if (Object.keys(errors).length) return { kind: "invalid", fieldErrors: errors };
  return { kind: "valid", value: { requestType: requestType as ServiceSubmission["requestType"], help, policy, firstName, lastName, email, phone, contactMethod: contactMethod as ServiceSubmission["contactMethod"], details } };
}
