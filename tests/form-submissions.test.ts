import assert from "node:assert/strict";
import test from "node:test";
import { deliverSubmissionEmails, AgencyNotificationError } from "../lib/forms/delivery.ts";
import { createQuoteMessages, createServiceMessages } from "../lib/forms/email-templates.ts";
import { readSubmissionBody } from "../lib/forms/request-body.ts";
import { validateQuoteSubmission, validateServiceSubmission } from "../lib/forms/validation.ts";

const config = {
  agencyInbox: "mina@demianinsurance.com",
  emailFrom: "Demian Insurance Agency <forms@demianinsurance.com>",
  siteUrl: "https://demianinsurance.com",
};

const quote = {
  insuranceType: "Home",
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@example.com",
  phone: "(941) 555-0123",
  contactMethod: "phone",
  notes: "We're buying a home in Sarasota.",
};

const service = {
  requestType: "Policy change",
  help: "Please update the vehicle on my policy.",
  policy: "123456789",
  firstName: "John",
  lastName: "Smith",
  email: "john@example.com",
  phone: "(941) 555-0199",
  contactMethod: "email",
  details: "Please call if more information is needed.",
};

test("validates representative Auto and Home quote requests", () => {
  assert.equal(validateQuoteSubmission({ ...quote, insuranceType: "Auto", companyWebsite: "" }).kind, "valid");
  assert.equal(validateQuoteSubmission({ ...quote, companyWebsite: "" }).kind, "valid");
});

test("rejects malformed quote requests and detects the honeypot", () => {
  assert.equal(validateQuoteSubmission({ ...quote, email: "invalid", companyWebsite: "" }).kind, "invalid");
  assert.equal(validateQuoteSubmission({ ...quote, firstName: "", companyWebsite: "" }).kind, "invalid");
  assert.equal(validateQuoteSubmission({ ...quote, insuranceType: "Boat", companyWebsite: "" }).kind, "invalid");
  assert.equal(validateQuoteSubmission({ ...quote, notes: "x".repeat(3001), companyWebsite: "" }).kind, "invalid");
  assert.equal(validateQuoteSubmission({ ...quote, companyWebsite: "https://spam.example" }).kind, "spam");
});

test("validates service requests with and without an optional policy number", () => {
  assert.equal(validateServiceSubmission({ ...service, companyWebsite: "" }).kind, "valid");
  assert.equal(validateServiceSubmission({ ...service, policy: "", companyWebsite: "" }).kind, "valid");
});

test("rejects malformed service requests and detects the honeypot", () => {
  assert.equal(validateServiceSubmission({ ...service, requestType: "Unsupported", companyWebsite: "" }).kind, "invalid");
  assert.equal(validateServiceSubmission({ ...service, email: "invalid", companyWebsite: "" }).kind, "invalid");
  assert.equal(validateServiceSubmission({ ...service, lastName: "", companyWebsite: "" }).kind, "invalid");
  assert.equal(validateServiceSubmission({ ...service, details: "x".repeat(3001), companyWebsite: "" }).kind, "invalid");
  assert.equal(validateServiceSubmission({ ...service, companyWebsite: "bot" }).kind, "spam");
});

test("builds safe quote messages with the required subject and reply behavior", () => {
  const validated = validateQuoteSubmission({ ...quote, notes: "<script>alert('xss')</script>\nSecond line", companyWebsite: "" });
  assert.equal(validated.kind, "valid");
  if (validated.kind !== "valid") return;
  const messages = createQuoteMessages(validated.value, config, new Date("2026-09-23T18:42:00Z"));
  assert.equal(messages.internal.subject, "[NEW QUOTE] Home — Jane Smith");
  assert.equal(messages.internal.replyTo, "jane@example.com");
  assert.equal(messages.confirmation.replyTo, config.agencyInbox);
  assert.match(messages.internal.text, /September 23, 2026 at 2:42 PM EDT/);
  assert.match(messages.internal.text, /demianinsurance\.com/);
  assert.doesNotMatch(messages.internal.html, /<script>/i);
  assert.match(messages.internal.html, /&lt;script&gt;alert\(&#39;xss&#39;\)&lt;\/script&gt;<br>Second line/);
});

test("rejects malformed and oversized request bodies", async () => {
  const malformed = await readSubmissionBody(new Request("https://example.com/api/quote", {
    method: "POST",
    body: "{not-json",
  }));
  assert.deepEqual(malformed, { ok: false, status: 400 });

  const oversized = await readSubmissionBody(new Request("https://example.com/api/quote", {
    method: "POST",
    body: JSON.stringify({ notes: "x".repeat(16_384) }),
  }));
  assert.deepEqual(oversized, { ok: false, status: 413 });
});

test("builds service messages and omits an empty policy number", () => {
  const validated = validateServiceSubmission({ ...service, policy: "", companyWebsite: "" });
  assert.equal(validated.kind, "valid");
  if (validated.kind !== "valid") return;
  const messages = createServiceMessages(validated.value, config, new Date("2026-09-23T18:42:00Z"));
  assert.equal(messages.internal.subject, "[CLIENT SERVICE] Policy Change — John Smith");
  assert.equal(messages.internal.replyTo, "john@example.com");
  assert.equal(messages.confirmation.replyTo, config.agencyInbox);
  assert.doesNotMatch(messages.internal.text, /Policy number:/);
});

test("does not send a confirmation when the agency notification fails", async () => {
  const validated = validateQuoteSubmission({ ...quote, companyWebsite: "" });
  assert.equal(validated.kind, "valid");
  if (validated.kind !== "valid") return;
  const messages = createQuoteMessages(validated.value, config, new Date());
  let calls = 0;
  await assert.rejects(() => deliverSubmissionEmails(messages, async () => { calls += 1; throw new Error("provider failure"); }), AgencyNotificationError);
  assert.equal(calls, 1);
});

test("keeps the submission successful when only confirmation fails", async () => {
  const validated = validateQuoteSubmission({ ...quote, companyWebsite: "" });
  assert.equal(validated.kind, "valid");
  if (validated.kind !== "valid") return;
  const messages = createQuoteMessages(validated.value, config, new Date());
  let calls = 0;
  const result = await deliverSubmissionEmails(messages, async () => {
    calls += 1;
    if (calls === 2) throw new Error("confirmation failure");
    return { id: "internal-id" };
  });
  assert.equal(calls, 2);
  assert.deepEqual(result, { confirmationSent: false });
});
