import { Resend } from "resend";
import type { EmailConfig, EmailMessage } from "./email-templates";
import type { EmailSender } from "./delivery";

type ResendConfig = EmailConfig & { apiKey: string };

export function getResendConfig(): ResendConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const agencyInbox = process.env.AGENCY_INBOX?.trim();
  const emailFrom = process.env.EMAIL_FROM?.trim();
  const siteUrl = process.env.SITE_URL?.trim();
  const missing = [
    ["RESEND_API_KEY", apiKey],
    ["AGENCY_INBOX", agencyInbox],
    ["EMAIL_FROM", emailFrom],
    ["SITE_URL", siteUrl],
  ].filter(([, value]) => !value).map(([name]) => name);
  if (missing.length) {
    console.error(`Form email is not configured. Missing: ${missing.join(", ")}.`);
    return null;
  }
  return { apiKey, agencyInbox, emailFrom, siteUrl } as ResendConfig;
}

export function createResendSender(apiKey: string): EmailSender {
  const resend = new Resend(apiKey);
  return async (message: EmailMessage) => {
    const { data, error } = await resend.emails.send({
      from: message.from,
      to: message.to,
      subject: message.subject,
      replyTo: message.replyTo,
      html: message.html,
      text: message.text,
    });
    if (error) throw new Error("Resend rejected the email request.");
    return { id: data?.id };
  };
}
