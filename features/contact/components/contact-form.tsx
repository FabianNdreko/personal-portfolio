"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type Status = "idle" | "submitting" | "success" | "mailto" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};

  if (name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Please enter a valid email.";
  }
  if (message.trim().length < 10) {
    errors.message = "A little more detail helps — at least a sentence.";
  }

  return errors;
}

function mailtoHref(name: string, email: string, message: string) {
  const subject = `Portfolio message from ${name}`;
  const body = `${message}\n\n— ${name}\n${email}`;
  return `mailto:${SITE.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const honeypot = String(data.get("company") ?? "");

    if (honeypot) {
      setStatus("success");
      return;
    }

    const nextErrors = validate(name, email, message);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `Portfolio message from ${name.trim()}`,
        }),
      });

      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("submit failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      window.location.href = mailtoHref(name.trim(), email.trim(), message.trim());
      setStatus("mailto");
    }
  }

  if (status === "success" || status === "mailto" || status === "error") {
    return (
      <div className="border-t border-border pt-8">
        <p className="text-lg font-semibold tracking-tight">
          {status === "error" ? "Form isn’t configured yet." : "Message ready."}
        </p>
        <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
          {status === "error"
            ? "Add your Web3Forms access key to NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env, then restart the dev server."
            : status === "mailto"
              ? "Your email app should open with the message filled in. Send it from there, or write me directly."
              : "Thanks — I’ll get back to you by email."}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrors({});
          }}
          className="mt-6 text-sm text-accent hover:underline"
        >
          {status === "error" ? "Try again" : "Send another"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="sr-only" aria-hidden>
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Field
        id="contact-name"
        name="name"
        label="Name"
        autoComplete="name"
        placeholder="Your name"
        error={errors.name}
      />
      <Field
        id="contact-email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email}
      />
      <Field
        id="contact-message"
        name="message"
        label="Message"
        placeholder="What are you working on, and how can I help?"
        error={errors.message}
        multiline
      />

      <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-dim">Goes to {SITE.contact.email}</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center justify-center rounded-md border border-accent bg-accent px-4.5 py-2.5 text-sm font-medium text-primary-foreground transition-colors",
            "hover:border-accent-dim hover:bg-accent-dim",
            "disabled:pointer-events-none disabled:opacity-60",
          )}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
};

function Field({
  id,
  name,
  label,
  placeholder,
  error,
  type = "text",
  autoComplete,
  multiline = false,
}: FieldProps) {
  const controlClass = cn(
    "w-full bg-transparent py-1 text-[15px] text-foreground outline-none placeholder:text-fg-dim",
    error && "text-destructive",
  );

  return (
    <div className="grid gap-2 border-b border-border py-5 sm:grid-cols-[11.5rem_1fr] sm:items-start sm:gap-8">
      <label htmlFor={id} className="pt-1 text-sm text-muted-foreground">
        {label}
      </label>
      <div>
        {multiline ? (
          <textarea
            id={id}
            name={name}
            rows={5}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(controlClass, "min-h-32 resize-y")}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={controlClass}
          />
        )}
        {error ? (
          <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
