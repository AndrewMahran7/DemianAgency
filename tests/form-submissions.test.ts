import assert from "node:assert/strict";
import test from "node:test";
import type { EmailMessage } from "../lib/forms/email-templates.ts";
import { handleQuoteRequest, handleServiceRequest, type SubmissionDependencies } from "../lib/forms/submission-handlers.ts";
import { validateQuoteSubmission, validateServiceSubmission } from "../lib/forms/validation.ts";

const config = {
  apiKey: "test-api-key",
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

const autofilledQuote = {
  insuranceType: "Life",
  firstName: "Andrew",
  lastName: "Mahran",
  email: "andrew@example.com",
  phone: "9493511509",
  contactMethod: "phone",
  notes: "Autofill regression test",
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

function jsonRequest(path: string, payload: unknown) {
  return new Request(`https://demianinsurance.com${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function createDependencies(failOnCall?: number) {
  const sent: EmailMessage[] = [];
  const logs: string[] = [];
  const dependencies: SubmissionDependencies = {
    getConfig: () => config,
    createSender: () => async (message) => {
      sent.push(message);
      if (sent.length === failOnCall) throw new Error("provider failure");
      return { id: `message-${sent.length}` };
    },
    now: () => new Date("2026-09-23T18:42:00Z"),
    logError: (message) => logs.push(message),
  };
  return { dependencies, sent, logs };
}

async function expectInvalid(response: Response, field: string) {
  assert.equal(response.status, 400);
  const body = await response.json() as { ok: boolean; fieldErrors?: Record<string, string> };
  assert.equal(body.ok, false);
  assert.ok(body.fieldErrors?.[field]);
}

test("valid quote requests send the agency notification before the customer confirmation", async () => {
  const { dependencies, sent } = createDependencies();
  const response = await handleQuoteRequest(jsonRequest("/api/quote", quote), dependencies);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(sent.length, 2);
  assert.equal(sent[0].to, config.agencyInbox);
  assert.equal(sent[0].from, config.emailFrom);
  assert.equal(sent[0].subject, "[NEW QUOTE] Home — Jane Smith");
  assert.equal(sent[0].replyTo, quote.email);
  assert.equal(sent[1].to, quote.email);
  assert.equal(sent[1].subject, "Demian Insurance Agency | We received your quote request");
  assert.equal(sent[1].replyTo, config.agencyInbox);
});

test("autofill-style quote values reach delivery and cannot produce a silent success", async () => {
  const { dependencies, sent } = createDependencies();
  const response = await handleQuoteRequest(jsonRequest("/api/quote", autofilledQuote), dependencies);
  assert.equal(response.status, 200);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].to, config.agencyInbox);
  assert.match(sent[0].text, /Andrew Mahran/);
  assert.match(sent[0].text, /Autofill regression test/);
});

test("quote validation rejects invalid email, missing fields, and invalid insurance types without sending", async () => {
  for (const [field, payload] of [
    ["email", { ...quote, email: "invalid" }],
    ["firstName", { ...quote, firstName: "" }],
    ["insuranceType", { ...quote, insuranceType: "Boat" }],
  ] as const) {
    const { dependencies, sent } = createDependencies();
    await expectInvalid(await handleQuoteRequest(jsonRequest("/api/quote", payload), dependencies), field);
    assert.equal(sent.length, 0);
  }
});

test("quote validation preserves field length and supported-field enforcement", async () => {
  const tooLong = createDependencies();
  await expectInvalid(await handleQuoteRequest(jsonRequest("/api/quote", { ...quote, notes: "x".repeat(3001) }), tooLong.dependencies), "notes");
  assert.equal(tooLong.sent.length, 0);

  const unexpected = createDependencies();
  await expectInvalid(await handleQuoteRequest(jsonRequest("/api/quote", { ...quote, unsupportedField: "value" }), unexpected.dependencies), "form");
  assert.equal(unexpected.sent.length, 0);
});

test("quote endpoint rejects payloads over 16 KB with 413", async () => {
  const { dependencies, sent } = createDependencies();
  const response = await handleQuoteRequest(jsonRequest("/api/quote", { ...quote, notes: "x".repeat(16_384) }), dependencies);
  assert.equal(response.status, 413);
  assert.equal(sent.length, 0);
});

test("quote provider failure returns a real customer-facing failure", async () => {
  const { dependencies, sent, logs } = createDependencies(1);
  const response = await handleQuoteRequest(jsonRequest("/api/quote", quote), dependencies);
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false, message: "Email delivery failed." });
  assert.equal(sent.length, 1);
  assert.deepEqual(logs, ["Quote agency notification send failed."]);
});

test("valid requests fail when email delivery is not configured", async () => {
  const { dependencies, sent } = createDependencies();
  const response = await handleQuoteRequest(jsonRequest("/api/quote", quote), { ...dependencies, getConfig: () => null });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { ok: false, message: "Email service is unavailable." });
  assert.equal(sent.length, 0);
});

test("quote confirmation failure remains successful after the agency notification succeeds", async () => {
  const { dependencies, sent, logs } = createDependencies(2);
  const response = await handleQuoteRequest(jsonRequest("/api/quote", quote), dependencies);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(sent.length, 2);
  assert.equal(sent[0].to, config.agencyInbox);
  assert.deepEqual(logs, ["Quote confirmation email send failed."]);
});

test("quote email rendering remains escaped and safe", async () => {
  const { dependencies, sent } = createDependencies();
  const response = await handleQuoteRequest(jsonRequest("/api/quote", { ...quote, notes: "<script>alert('xss')</script>\nSecond line" }), dependencies);
  assert.equal(response.status, 200);
  assert.doesNotMatch(sent[0].html, /<script>/i);
  assert.match(sent[0].html, /&lt;script&gt;alert\(&#39;xss&#39;\)&lt;\/script&gt;<br>Second line/);
});

test("valid service requests send with and without an optional policy number", async () => {
  for (const payload of [service, { ...service, policy: "" }]) {
    const { dependencies, sent } = createDependencies();
    const response = await handleServiceRequest(jsonRequest("/api/service", payload), dependencies);
    assert.equal(response.status, 200);
    assert.equal(sent.length, 2);
    assert.equal(sent[0].to, config.agencyInbox);
    assert.equal(sent[0].from, config.emailFrom);
    assert.equal(sent[0].subject, "[CLIENT SERVICE] Policy Change — John Smith");
    assert.equal(sent[0].replyTo, service.email);
    assert.equal(sent[1].subject, "Demian Insurance Agency | We received your service request");
    assert.equal(sent[1].replyTo, config.agencyInbox);
    if (!payload.policy) assert.doesNotMatch(sent[0].text, /Policy number:/);
  }
});

test("autofill-style service values reach delivery", async () => {
  const { dependencies, sent } = createDependencies();
  const payload = {
    ...service,
    firstName: "Andrew",
    lastName: "Mahran",
    email: "andrew@example.com",
    phone: "9493511509",
    contactMethod: "phone",
    help: "Autofill regression test for a policy change.",
  };
  const response = await handleServiceRequest(jsonRequest("/api/service", payload), dependencies);
  assert.equal(response.status, 200);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].to, config.agencyInbox);
});

test("service validation rejects invalid email, invalid type, and missing required fields without sending", async () => {
  for (const [field, payload] of [
    ["email", { ...service, email: "invalid" }],
    ["requestType", { ...service, requestType: "Unsupported" }],
    ["lastName", { ...service, lastName: "" }],
  ] as const) {
    const { dependencies, sent } = createDependencies();
    await expectInvalid(await handleServiceRequest(jsonRequest("/api/service", payload), dependencies), field);
    assert.equal(sent.length, 0);
  }
});

test("service validation preserves length limits", async () => {
  const { dependencies, sent } = createDependencies();
  await expectInvalid(await handleServiceRequest(jsonRequest("/api/service", { ...service, details: "x".repeat(3001) }), dependencies), "details");
  assert.equal(sent.length, 0);
});

test("service endpoint rejects payloads over 16 KB with 413", async () => {
  const { dependencies, sent } = createDependencies();
  const response = await handleServiceRequest(jsonRequest("/api/service", { ...service, details: "x".repeat(16_384) }), dependencies);
  assert.equal(response.status, 413);
  assert.equal(sent.length, 0);
});

test("service provider failure returns a real customer-facing failure", async () => {
  const { dependencies, sent, logs } = createDependencies(1);
  const response = await handleServiceRequest(jsonRequest("/api/service", service), dependencies);
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { ok: false, message: "Email delivery failed." });
  assert.equal(sent.length, 1);
  assert.deepEqual(logs, ["Service agency notification send failed."]);
});

test("malformed JSON returns 400 without attempting delivery", async () => {
  const { dependencies, sent } = createDependencies();
  const response = await handleQuoteRequest(new Request("https://demianinsurance.com/api/quote", { method: "POST", body: "{not-json" }), dependencies);
  assert.equal(response.status, 400);
  assert.equal(sent.length, 0);
});

test("validators retain enum allowlists and preferred-contact validation", () => {
  assert.equal(validateQuoteSubmission({ ...quote, contactMethod: "fax" }).kind, "invalid");
  assert.equal(validateServiceSubmission({ ...service, contactMethod: "fax" }).kind, "invalid");
});
