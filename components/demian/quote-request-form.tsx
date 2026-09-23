"use client";

import { useRef, useState } from "react";
import { AlertCircle, ArrowRight, Check, LoaderCircle, LockKeyhole, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { quoteInsuranceTypes } from "@/lib/forms/validation";

const insuranceTypes = quoteInsuranceTypes;

type QuoteValues = {
  insuranceType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
  notes: string;
};

const blankValues: QuoteValues = {
  insuranceType: "", firstName: "", lastName: "", email: "", phone: "", contactMethod: "phone", notes: "",
};

type QuoteErrors = Partial<Record<keyof QuoteValues, string>>;
type FormStatus = "idle" | "loading" | "success" | "error";

function validateQuote(values: QuoteValues): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!values.insuranceType) errors.insuranceType = "Choose an insurance type.";
  if (!values.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!values.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a valid phone number.";
  return errors;
}

export function QuoteRequestForm({ initialType = "", compact = false }: { initialType?: string; compact?: boolean }) {
  const matchedInitialType = insuranceTypes.find((type) => type.toLowerCase() === initialType.toLowerCase()) ?? "";
  const [values, setValues] = useState<QuoteValues>(() => ({ ...blankValues, insuranceType: matchedInitialType }));
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const submissionErrorRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  function update<K extends keyof QuoteValues>(field: K, value: QuoteValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateQuote(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setStatus("loading");
    try {
      const companyWebsite = String(new FormData(event.currentTarget).get("companyWebsite") ?? "");
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, companyWebsite }),
      });
      const result = await response.json().catch(() => null) as { fieldErrors?: QuoteErrors } | null;
      if (!response.ok) {
        if (result?.fieldErrors) setErrors(result.fieldErrors);
        setStatus("error");
        requestAnimationFrame(() => submissionErrorRef.current?.focus());
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      requestAnimationFrame(() => submissionErrorRef.current?.focus());
    }
  }

  function reset() {
    setValues({ ...blankValues, insuranceType: matchedInitialType });
    setErrors({});
    setStatus("idle");
  }

  return (
    <div className={`request-form-shell quote-form-shell ${compact ? "is-compact" : ""}`}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div className="form-success" key="success" role="status" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span className="success-icon"><Check aria-hidden="true" /></span>
            <p className="eyebrow">Request received</p>
            <h2>Thanks, {values.firstName}. We received your request.</h2>
            <p>A member of the Demian Insurance Agency team will follow up using your preferred contact method. Prefer to talk? Call <a href="tel:+19413771806">(941) 377-1806</a> during business hours.</p>
            <button className="text-button" type="button" onClick={reset}><RotateCcw aria-hidden="true" size={16} /> Start another request</button>
          </motion.div>
        ) : (
          <motion.form ref={formRef} key="form" className="request-form quote-form" onSubmit={handleSubmit} noValidate aria-busy={status === "loading"} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="demo-notice"><LockKeyhole aria-hidden="true" size={15} /><span><strong>Privacy note:</strong> Please don&apos;t include Social Security numbers, payment details, or other sensitive application information.</span></div>
            <div className="form-honeypot" aria-hidden="true"><label htmlFor="quote-company-website">Company website</label><input id="quote-company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" /></div>
            {status === "error" && <div className="submission-error field-wide" role="alert" tabIndex={-1} ref={submissionErrorRef}><AlertCircle aria-hidden="true" size={18} /><p><strong>We couldn&apos;t send your request right now.</strong><br />Please try again, or call us at <a href="tel:+19413771806">(941) 377-1806</a>.</p></div>}

            <div className="field field-wide">
              <label id="quote-type-label">What would you like to insure?</label>
              <Select value={values.insuranceType} onValueChange={(value) => update("insuranceType", value)}>
                <SelectTrigger className="select-control" aria-labelledby="quote-type-label" aria-invalid={Boolean(errors.insuranceType)} aria-describedby={errors.insuranceType ? "quote-type-error" : undefined}>
                  <SelectValue placeholder="Choose an insurance type" />
                </SelectTrigger>
                <SelectContent className="select-menu">
                  {insuranceTypes.map((type) => <SelectItem className="select-option" value={type} key={type}>{type} insurance</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.insuranceType && <p className="field-error" id="quote-type-error"><AlertCircle aria-hidden="true" size={14} />{errors.insuranceType}</p>}
            </div>

            <QuoteTextField id="quote-firstName" label="First name" value={values.firstName} error={errors.firstName} autoComplete="given-name" onChange={(value) => update("firstName", value)} />
            <QuoteTextField id="quote-lastName" label="Last name" value={values.lastName} error={errors.lastName} autoComplete="family-name" onChange={(value) => update("lastName", value)} />
            <QuoteTextField id="quote-email" label="Email" type="email" value={values.email} error={errors.email} autoComplete="email" onChange={(value) => update("email", value)} />
            <QuoteTextField id="quote-phone" label="Phone" type="tel" value={values.phone} error={errors.phone} autoComplete="tel" onChange={(value) => update("phone", value)} />

            <fieldset className="field field-wide contact-choice">
              <legend>Preferred contact method</legend>
              <RadioGroup className="contact-options" value={values.contactMethod} onValueChange={(value) => update("contactMethod", value)}>
                {["Phone", "Email", "Text"].map((method) => (
                  <label key={method} className="radio-card" htmlFor={`quote-contact-${method.toLowerCase()}`}>
                    <RadioGroupItem id={`quote-contact-${method.toLowerCase()}`} value={method.toLowerCase()} />
                    <span>{method}</span>
                  </label>
                ))}
              </RadioGroup>
            </fieldset>

            <div className="field field-wide">
              <label htmlFor="quote-notes">Anything we should know? <span>(optional)</span></label>
              <Textarea id="quote-notes" value={values.notes} maxLength={3000} onChange={(event) => update("notes", event.target.value)} placeholder="A short note about what you are looking to insure" />
            </div>

            <div className="form-submit field-wide">
              <p>This is a first-contact request—not a full insurance application or a promise of coverage.</p>
              <button className="button" type="submit" disabled={status === "loading"}>
                {status === "loading" ? <><LoaderCircle className="spin" aria-hidden="true" size={18} /> Sending request...</> : <>Send Quote Request <ArrowRight aria-hidden="true" size={18} /></>}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuoteTextField({ id, label, value, error, type = "text", autoComplete, onChange }: {
  id: string; label: string; value: string; error?: string; type?: string; autoComplete?: string; onChange(value: string): void;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Input id={id} type={type} value={value} maxLength={type === "email" ? 254 : type === "tel" ? 50 : 100} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
      {error && <p className="field-error" id={errorId}><AlertCircle aria-hidden="true" size={14} />{error}</p>}
    </div>
  );
}
