"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type FieldErrors = {
  name?: string;
  email?: string;
};

type Status = "idle" | "submitting" | "success" | "error";
type ErrorReason = "config" | "submit";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, email: string): FieldErrors {
  const errors: FieldErrors = {};

  if (name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Please enter a valid email.";
  }

  return errors;
}

const ERROR_COPY: Record<ErrorReason, { title: string; body: string }> = {
  config: {
    title: "Form isn’t configured yet.",
    body: "Add your Web3Forms access key to WEB3FORMS_ACCESS_KEY in .env, then restart the dev server.",
  },
  submit: {
    title: "Couldn’t send message.",
    body: "Something went wrong sending your message. Please try again in a moment.",
  },
};

type ContactFormProps = {
  accessKey: string;
};

export function ContactForm({ accessKey }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorReason, setErrorReason] = useState<ErrorReason>("submit");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");
    const company = String(data.get("company") ?? "");

    if (company) {
      setStatus("success");
      return;
    }

    const nextErrors = validate(name, email);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!accessKey) {
      setErrorReason("config");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name.trim(),
          from_name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          message: message.trim() || "(No message)",
          subject: `Portfolio message from ${name.trim()}`,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
      };

      if (!response.ok || !result.success) {
        throw new Error("submit failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorReason("submit");
      setStatus("error");
    }
  }

  if (status === "success" || status === "error") {
    const copy =
      status === "error"
        ? ERROR_COPY[errorReason]
        : {
            title: "Message sent.",
            body: "Thanks — I’ll reply by email as soon as I can.",
          };

    return (
      <div className="px-1 py-2">
        <p className="font-display text-xl font-semibold tracking-tight text-foreground">
          {copy.title}
        </p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
          {copy.body}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrors({});
          }}
          className="mt-6 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {status === "error" ? "Try again" : "Send another"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <div className="sr-only" aria-hidden>
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="mb-8 text-[11px] font-medium tracking-[0.2em] text-fg-dim uppercase">
        Inquiry form
      </p>

      <Field
        id="contact-name"
        name="name"
        label="Name"
        autoComplete="name"
        error={errors.name}
      />
      <Field
        id="contact-email"
        name="email"
        label="E-mail"
        type="email"
        autoComplete="email"
        error={errors.email}
      />
      <Field
        id="contact-phone"
        name="phone"
        label="Phone"
        type="tel"
        autoComplete="tel"
      />
      <Field id="contact-message" name="message" label="Message" multiline />

      <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] text-muted-foreground">
          Usually replies within 24 hours.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex w-full items-center justify-center rounded-full border border-accent/60 bg-accent px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground sm:w-auto",
            "shadow-[0_0_28px_rgba(232,184,74,0.22)] transition-all duration-300",
            "hover:border-accent-dim hover:bg-accent-dim",
            "disabled:pointer-events-none disabled:opacity-60",
          )}
        >
          {status === "submitting" ? "Sending…" : "Send message —"}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
};

function Field({
  id,
  name,
  label,
  error,
  type = "text",
  autoComplete,
  multiline = false,
}: FieldProps) {
  const controlClass = cn(
    "w-full border-0 border-b border-border-strong bg-transparent py-2 text-base text-foreground outline-none transition-colors",
    "placeholder:text-fg-dim focus:border-accent",
    error && "border-destructive text-destructive",
  );

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-1 block text-[13px] tracking-wide text-muted-foreground"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={3}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(controlClass, "min-h-24 resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={controlClass}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
