import { deliverSubmissionEmails } from "@/lib/forms/delivery";
import { createServiceMessages } from "@/lib/forms/email-templates";
import { readSubmissionBody } from "@/lib/forms/request-body";
import { createResendSender, getResendConfig } from "@/lib/forms/resend-client";
import { validateServiceSubmission } from "@/lib/forms/validation";

export async function POST(request: Request) {
  const body = await readSubmissionBody(request);
  if (!body.ok) return Response.json({ ok: false, message: "Submit a valid request." }, { status: body.status });

  const validation = validateServiceSubmission(body.value);
  if (validation.kind === "spam") return Response.json({ ok: true });
  if (validation.kind === "invalid") return Response.json({ ok: false, message: "Please review the form.", fieldErrors: validation.fieldErrors }, { status: 400 });

  const config = getResendConfig();
  if (!config) return Response.json({ ok: false, message: "Email service is unavailable." }, { status: 503 });

  try {
    const result = await deliverSubmissionEmails(createServiceMessages(validation.value, config, new Date()), createResendSender(config.apiKey));
    if (!result.confirmationSent) console.error("Service confirmation email send failed.");
    return Response.json({ ok: true });
  } catch {
    console.error("Service agency notification send failed.");
    return Response.json({ ok: false, message: "Email delivery failed." }, { status: 502 });
  }
}
