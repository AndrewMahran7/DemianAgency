import type { EmailMessage, SubmissionMessages } from "./email-templates";

export type EmailSender = (message: EmailMessage) => Promise<{ id?: string }>;

export class AgencyNotificationError extends Error {
  constructor() {
    super("Agency notification could not be delivered.");
    this.name = "AgencyNotificationError";
  }
}

export async function deliverSubmissionEmails(messages: SubmissionMessages, send: EmailSender) {
  try {
    await send(messages.internal);
  } catch {
    throw new AgencyNotificationError();
  }

  try {
    await send(messages.confirmation);
    return { confirmationSent: true };
  } catch {
    return { confirmationSent: false };
  }
}
