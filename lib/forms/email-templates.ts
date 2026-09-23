import type { QuoteSubmission, ServiceSubmission } from "./validation";

export type EmailConfig = {
  agencyInbox: string;
  emailFrom: string;
  siteUrl: string;
};

export type EmailMessage = {
  from: string;
  to: string;
  subject: string;
  replyTo: string;
  html: string;
  text: string;
};

export type SubmissionMessages = {
  internal: EmailMessage;
  confirmation: EmailMessage;
};

const phone = "(941) 377-1806";
const hoursText = "Monday–Friday: 9 AM–6 PM\nSaturday: 9 AM–1 PM";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]!);
}

function htmlText(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function titleCaseRequestType(value: string) {
  return value.split(" ").map((word) => word === "/" ? word : `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(" ");
}

export function formatEasternTimestamp(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function sourceLabel(siteUrl: string) {
  try {
    return new URL(siteUrl).hostname.replace(/^www\./, "");
  } catch {
    return siteUrl;
  }
}

function internalHtml(title: string, rows: Array<[string, string]>, replyName: string) {
  const bodyRows = rows.map(([label, value]) => `<tr><td style="padding:0 18px 18px 0;width:145px;vertical-align:top;color:#66717d;font:600 12px Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em">${escapeHtml(label)}</td><td style="padding:0 0 18px;vertical-align:top;color:#132b45;font:15px/1.55 Arial,sans-serif">${htmlText(value)}</td></tr>`).join("");
  return `<!doctype html><html><body style="margin:0;background:#f5f1e8"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f1e8"><tr><td align="center" style="padding:28px 14px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fff;border-top:4px solid #b59a62"><tr><td style="padding:34px 38px 18px"><div style="color:#8a7245;font:700 11px Arial,sans-serif;letter-spacing:.16em">DEMIAN INSURANCE AGENCY</div><h1 style="margin:12px 0 0;color:#0b2745;font:400 30px Georgia,serif">${escapeHtml(title)}</h1></td></tr><tr><td style="padding:14px 38px 20px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${bodyRows}</table></td></tr><tr><td style="padding:22px 38px;background:#0b2745;color:#fff;font:14px/1.6 Arial,sans-serif">Reply to this email to contact ${escapeHtml(replyName)} directly.</td></tr></table></td></tr></table></body></html>`;
}

function confirmationHtml(firstName: string, heading: string, paragraphs: string[]) {
  return `<!doctype html><html><body style="margin:0;background:#f5f1e8"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f1e8"><tr><td align="center" style="padding:28px 14px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fff;border-top:4px solid #b59a62"><tr><td style="padding:34px 38px"><div style="color:#8a7245;font:700 11px Arial,sans-serif;letter-spacing:.16em">DEMIAN INSURANCE AGENCY</div><h1 style="margin:14px 0 24px;color:#0b2745;font:400 30px Georgia,serif">${escapeHtml(heading)}</h1><p style="margin:0 0 18px;color:#24384c;font:16px/1.65 Arial,sans-serif">Hi ${escapeHtml(firstName)},</p>${paragraphs.map((paragraph) => `<p style="margin:0 0 18px;color:#24384c;font:16px/1.65 Arial,sans-serif">${htmlText(paragraph)}</p>`).join("")}<div style="margin-top:26px;padding:20px;background:#f5f1e8;color:#24384c;font:14px/1.7 Arial,sans-serif"><strong>Need to speak with someone?</strong><br>${phone}<br>Monday–Friday: 9 AM–6 PM<br>Saturday: 9 AM–1 PM</div><p style="margin:24px 0 0;color:#24384c;font:15px/1.6 Arial,sans-serif">Demian Insurance Agency</p></td></tr></table></td></tr></table></body></html>`;
}

export function createQuoteMessages(submission: QuoteSubmission, config: EmailConfig, submittedAt: Date): SubmissionMessages {
  const fullName = `${submission.firstName} ${submission.lastName}`;
  const insurance = `${submission.insuranceType} Insurance`;
  const timestamp = formatEasternTimestamp(submittedAt);
  const source = sourceLabel(config.siteUrl);
  const rows: Array<[string, string]> = [
    ["Insurance", insurance], ["Customer", fullName], ["Email", submission.email], ["Phone", submission.phone],
    ["Preferred contact", titleCaseRequestType(submission.contactMethod)],
    ...(submission.notes ? [["Message", submission.notes] as [string, string]] : []),
    ["Submitted", timestamp], ["Source", source],
  ];
  return {
    internal: {
      from: config.emailFrom,
      to: config.agencyInbox,
      subject: `[NEW QUOTE] ${submission.insuranceType} — ${fullName}`,
      replyTo: submission.email,
      html: internalHtml("NEW QUOTE REQUEST", rows, submission.firstName),
      text: [`DEMIAN INSURANCE AGENCY`, `NEW QUOTE REQUEST`, ``, ...rows.map(([label, value]) => `${label}: ${value}`), ``, `Reply to this email to contact ${submission.firstName} directly.`].join("\n"),
    },
    confirmation: {
      from: config.emailFrom,
      to: submission.email,
      subject: "We received your quote request | Demian Insurance Agency",
      replyTo: config.agencyInbox,
      html: confirmationHtml(submission.firstName, "We received your quote request.", [`Thanks for reaching out to Demian Insurance Agency.`, `We've received your ${insurance} quote request. A member of our team will follow up using your preferred contact method.`]),
      text: [`Hi ${submission.firstName},`, ``, `Thanks for reaching out to Demian Insurance Agency.`, ``, `We've received your ${insurance} quote request. A member of our team will follow up using your preferred contact method.`, ``, `If you'd rather speak with someone, call ${phone} during business hours:`, hoursText, ``, `Demian Insurance Agency`].join("\n"),
    },
  };
}

export function createServiceMessages(submission: ServiceSubmission, config: EmailConfig, submittedAt: Date): SubmissionMessages {
  const fullName = `${submission.firstName} ${submission.lastName}`;
  const requestType = titleCaseRequestType(submission.requestType || "Service request");
  const timestamp = formatEasternTimestamp(submittedAt);
  const source = sourceLabel(config.siteUrl);
  const rows: Array<[string, string]> = [
    ["Request", requestType],
    ...(submission.policy ? [["Policy number", submission.policy] as [string, string]] : []),
    ["Customer", fullName], ["Email", submission.email], ["Phone", submission.phone],
    ["Preferred contact", titleCaseRequestType(submission.contactMethod)], ["Request details", submission.help],
    ...(submission.details ? [["Additional details", submission.details] as [string, string]] : []),
    ["Submitted", timestamp], ["Source", source],
  ];
  return {
    internal: {
      from: config.emailFrom,
      to: config.agencyInbox,
      subject: `[CLIENT SERVICE] ${requestType} — ${fullName}`,
      replyTo: submission.email,
      html: internalHtml("CLIENT SERVICE REQUEST", rows, submission.firstName),
      text: [`DEMIAN INSURANCE AGENCY`, `CLIENT SERVICE REQUEST`, ``, ...rows.map(([label, value]) => `${label}: ${value}`), ``, `Reply to this email to contact ${submission.firstName} directly.`].join("\n"),
    },
    confirmation: {
      from: config.emailFrom,
      to: submission.email,
      subject: "We received your service request | Demian Insurance Agency",
      replyTo: config.agencyInbox,
      html: confirmationHtml(submission.firstName, "We received your service request.", [`A member of the Demian Insurance Agency customer service team will follow up within one business day with a resolution or any additional information needed.`, `We'll use your preferred contact method.`]),
      text: [`Hi ${submission.firstName},`, ``, `We've received your service request.`, ``, `A member of the Demian Insurance Agency customer service team will follow up within one business day with a resolution or any additional information needed.`, ``, `We'll use your preferred contact method.`, ``, `Need to speak with someone?`, phone, hoursText, ``, `Demian Insurance Agency`].join("\n"),
    },
  };
}
