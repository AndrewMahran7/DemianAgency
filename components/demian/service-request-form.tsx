"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowRight, Check, LoaderCircle, LockKeyhole, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { requestTypes } from "@/lib/site-config";

type FormValues = {
  requestType: string;
  help: string;
  policy: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
  details: string;
};

const initialValues: FormValues = {
  requestType: "", help: "", policy: "", firstName: "", lastName: "",
  email: "", phone: "", contactMethod: "phone", details: "",
};

type Errors = Partial<Record<keyof FormValues, string>>;
type FormStatus = "idle" | "loading" | "success" | "error";

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.requestType) errors.requestType = "Choose the type of help you need.";
  if (values.help.trim().length < 10) errors.help = "Tell us a little more so we know how to help.";
  if (!values.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!values.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a valid phone number.";
  return errors;
}

export function ServiceRequestForm({ compact = false, initialType = "" }: { compact?: boolean; initialType?: string }) {
  const matchedInitialType = requestTypes.find((type) => type.toLowerCase() === initialType.toLowerCase()) ?? "";
  const startingValues = { ...initialValues, requestType: matchedInitialType };
  const [values, setValues] = useState<FormValues>(() => startingValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const submissionErrorRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const execute = async (input: unknown) => {
      const requestType = typeof input === "object" && input && "requestType" in input
        ? String((input as { requestType?: unknown }).requestType ?? "")
        : "";
      const validType = requestTypes.find((item) => item.toLowerCase() === requestType.toLowerCase());
      if (requestType && !validType) throw new Error("Unsupported request type.");
      if (validType) setValues((current) => ({ ...current, requestType: validType }));
      setStatus("idle");
      requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        formRef.current?.querySelector<HTMLElement>("textarea")?.focus({ preventScroll: true });
      });
      return { status: "ready", requestType: validType ?? null, submission: "not_sent" };
    };

    try {
      void Promise.resolve(context.registerTool({
        name: "start_service_request",
        title: "Start service request",
        description: "Open the visible service request form and optionally choose an insurance or service type. This does not submit any data.",
        inputSchema: {
          type: "object",
          properties: { requestType: { type: "string", enum: [...requestTypes] } },
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute,
      }, { signal: lifecycle.signal })).catch(() => undefined);
    } catch { /* WebMCP is optional and browser-dependent. */ }
    return () => lifecycle.abort();
  }, [reduceMotion]);

  function update<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setStatus("loading");
    try {
      const companyWebsite = String(new FormData(event.currentTarget).get("companyWebsite") ?? "");
      const response = await fetch("/api/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, companyWebsite }),
      });
      const result = await response.json().catch(() => null) as { fieldErrors?: Errors } | null;
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
    setValues(startingValues);
    setErrors({});
    setStatus("idle");
  }

  return (
    <div className={`request-form-shell ${compact ? "is-compact" : ""}`}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div className="form-success" key="success" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span className="success-icon"><Check aria-hidden="true" /></span>
            <p className="eyebrow">Request received</p>
            <h3>Thanks, {values.firstName}. We received your service request.</h3>
            <p>A member of our customer service team will follow up within one business day with a resolution or any additional information needed.</p>
            <button className="text-button" type="button" onClick={reset}><RotateCcw aria-hidden="true" size={16} /> Start another request</button>
          </motion.div>
        ) : (
          <motion.form ref={formRef} key="form" className="request-form" onSubmit={handleSubmit} noValidate aria-busy={status === "loading"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="demo-notice"><LockKeyhole size={15} aria-hidden="true" /><span><strong>Privacy note:</strong> Please don&apos;t include Social Security numbers, payment details, or other sensitive application information.</span></div>
            <div className="form-honeypot" aria-hidden="true"><label htmlFor="service-company-website">Company website</label><input id="service-company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" /></div>
            {status === "error" && <div className="submission-error field-wide" role="alert" tabIndex={-1} ref={submissionErrorRef}><AlertCircle aria-hidden="true" size={18} /><p><strong>We couldn&apos;t send your request right now.</strong><br />Please try again, or call us at <a href="tel:+19413771806">(941) 377-1806</a>.</p></div>}

            <div className="field field-wide">
              <label id="request-type-label">Insurance or service type</label>
              <Select value={values.requestType} onValueChange={(value) => update("requestType", value)}>
                <SelectTrigger className="select-control" aria-labelledby="request-type-label" aria-invalid={Boolean(errors.requestType)} aria-describedby={errors.requestType ? "request-type-error" : undefined}>
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent className="select-menu">
                  {requestTypes.map((type) => <SelectItem className="select-option" value={type} key={type}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.requestType && <p className="field-error" id="request-type-error"><AlertCircle size={14} />{errors.requestType}</p>}
            </div>

            <div className="field field-wide">
              <label htmlFor="help">What can we help with?</label>
              <Textarea id="help" value={values.help} maxLength={3000} onChange={(event) => update("help", event.target.value)} placeholder="Briefly describe what you need help with" aria-invalid={Boolean(errors.help)} aria-describedby={errors.help ? "help-error" : "help-hint"} />
              {errors.help ? <p className="field-error" id="help-error"><AlertCircle size={14} />{errors.help}</p> : <p className="field-hint" id="help-hint">A sentence or two is perfect.</p>}
            </div>

            <div className="field field-wide">
              <label htmlFor="policy">Policy number <span>(if applicable)</span></label>
              <Input id="policy" value={values.policy} maxLength={100} onChange={(event) => update("policy", event.target.value)} autoComplete="off" />
            </div>

            <div className="form-divider field-wide"><span>Contact information</span></div>

            <TextField id="firstName" label="First name" value={values.firstName} error={errors.firstName} autoComplete="given-name" onChange={(value) => update("firstName", value)} />
            <TextField id="lastName" label="Last name" value={values.lastName} error={errors.lastName} autoComplete="family-name" onChange={(value) => update("lastName", value)} />
            <TextField id="email" label="Email" type="email" value={values.email} error={errors.email} autoComplete="email" onChange={(value) => update("email", value)} />
            <TextField id="phone" label="Phone" type="tel" value={values.phone} error={errors.phone} autoComplete="tel" onChange={(value) => update("phone", value)} />

            <fieldset className="field field-wide contact-choice">
              <legend>Preferred contact method</legend>
              <RadioGroup className="contact-options" value={values.contactMethod} onValueChange={(value) => update("contactMethod", value)}>
                {["Phone", "Email", "Text"].map((method) => (
                  <label key={method} className="radio-card" htmlFor={`contact-${method.toLowerCase()}`}>
                    <RadioGroupItem id={`contact-${method.toLowerCase()}`} value={method.toLowerCase()} />
                    <span>{method}</span>
                  </label>
                ))}
              </RadioGroup>
            </fieldset>

            <div className="field field-wide">
              <label htmlFor="details">Additional details <span>(optional)</span></label>
              <Textarea id="details" value={values.details} maxLength={3000} onChange={(event) => update("details", event.target.value)} placeholder="Anything else the team should know?" />
            </div>

            <div className="form-submit field-wide">
              <p>By submitting, you&apos;ll ask the Demian team to contact you about your request.</p>
              <button className="button" type="submit" disabled={status === "loading"}>
                {status === "loading" ? <><LoaderCircle className="spin" aria-hidden="true" size={18} /> Sending request...</> : <>Send Service Request <ArrowRight aria-hidden="true" size={18} /></>}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextField({ id, label, value, error, type = "text", autoComplete, onChange }: {
  id: keyof FormValues; label: string; value: string; error?: string; type?: string; autoComplete?: string; onChange(value: string): void;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Input id={id} type={type} value={value} maxLength={type === "email" ? 254 : type === "tel" ? 50 : 100} onChange={(event) => onChange(event.target.value)} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />
      {error && <p className="field-error" id={`${id}-error`}><AlertCircle size={14} />{error}</p>}
    </div>
  );
}
