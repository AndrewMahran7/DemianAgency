import { deliverSubmissionEmails, type EmailSender } from "./delivery.ts";
import { createQuoteMessages, createServiceMessages, type EmailConfig } from "./email-templates.ts";
import { readSubmissionBody } from "./request-body.ts";
import { createResendSender, getResendConfig } from "./resend-client.ts";
import { validateQuoteSubmission, validateServiceSubmission } from "./validation.ts";

type RouteEmailConfig = EmailConfig & { apiKey: string };

export type SubmissionDependencies = {
  getConfig: () => RouteEmailConfig | null;
  createSender: (apiKey: string) => EmailSender;
  now: () => Date;
  logError: (message: string) => void;
};

const productionDependencies: SubmissionDependencies = {
  getConfig: getResendConfig,
  createSender: createResendSender,
  now: () => new Date(),
  logError: (message) => console.error(message),
};

export async function handleQuoteRequest(request: Request, dependencies: SubmissionDependencies = productionDependencies) {
  const body = await readSubmissionBody(request);
  if (!body.ok) return Response.json({ ok: false, message: "Submit a valid request." }, { status: body.status });

  const validation = validateQuoteSubmission(body.value);
  if (validation.kind === "invalid") return Response.json({ ok: false, message: "Please review the form.", fieldErrors: validation.fieldErrors }, { status: 400 });

  const config = dependencies.getConfig();
  if (!config) return Response.json({ ok: false, message: "Email service is unavailable." }, { status: 503 });

  try {
    const result = await deliverSubmissionEmails(createQuoteMessages(validation.value, config, dependencies.now()), dependencies.createSender(config.apiKey));
    if (!result.confirmationSent) dependencies.logError("Quote confirmation email send failed.");
    return Response.json({ ok: true });
  } catch {
    dependencies.logError("Quote agency notification send failed.");
    return Response.json({ ok: false, message: "Email delivery failed." }, { status: 502 });
  }
}

export async function handleServiceRequest(request: Request, dependencies: SubmissionDependencies = productionDependencies) {
  const body = await readSubmissionBody(request);
  if (!body.ok) return Response.json({ ok: false, message: "Submit a valid request." }, { status: body.status });

  const validation = validateServiceSubmission(body.value);
  if (validation.kind === "invalid") return Response.json({ ok: false, message: "Please review the form.", fieldErrors: validation.fieldErrors }, { status: 400 });

  const config = dependencies.getConfig();
  if (!config) return Response.json({ ok: false, message: "Email service is unavailable." }, { status: 503 });

  try {
    const result = await deliverSubmissionEmails(createServiceMessages(validation.value, config, dependencies.now()), dependencies.createSender(config.apiKey));
    if (!result.confirmationSent) dependencies.logError("Service confirmation email send failed.");
    return Response.json({ ok: true });
  } catch {
    dependencies.logError("Service agency notification send failed.");
    return Response.json({ ok: false, message: "Email delivery failed." }, { status: 502 });
  }
}
