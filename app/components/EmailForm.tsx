"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export default function EmailForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, handleSubmit] = useForm("emailSignup");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [consented, setConsented] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.succeeded) onSuccess?.();
  }, [state.succeeded, onSuccess]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const emailOk = isValidEmail(email);
    const consentOk = consented;

    if (!emailOk) setEmailError(true);
    if (!consentOk) setConsentError(true);

    if (!emailOk || !consentOk) {
      e.preventDefault();
      if (!emailOk) emailRef.current?.focus();
      return;
    }

    return handleSubmit(e);
  }

  if (state.succeeded) return null;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="email-signup" className="sr-only">
            Email address
          </label>
          <input
            ref={emailRef}
            id="email-signup"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError && isValidEmail(e.target.value)) setEmailError(false);
            }}
            onBlur={() => {
              if (email && !isValidEmail(email)) setEmailError(true);
            }}
            className={`email-input flex-1${emailError ? " email-input--error" : ""}`}
            disabled={state.submitting}
            aria-describedby={emailError ? "email-error" : undefined}
            aria-invalid={emailError}
          />
          <button
            type="submit"
            className="email-btn"
            disabled={state.submitting}
            aria-label="Subscribe to updates"
          >
            {state.submitting ? "Sending…" : "Keep me posted"}
          </button>
        </div>

        {emailError && (
          <p id="email-error" className="email-field-error" role="alert">
            Please enter a valid email address.
          </p>
        )}

        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="email-field-error"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="optin-label">
          <input
            type="checkbox"
            name="marketing_consent"
            value="yes"
            checked={consented}
            onChange={(e) => {
              setConsented(e.target.checked);
              if (e.target.checked) setConsentError(false);
            }}
            className="optin-checkbox"
            disabled={state.submitting}
            aria-describedby="optin-desc"
            aria-invalid={consentError}
          />
          <span id="optin-desc" className="optin-text">
            I agree to receive updates from Sunsetrider Media. You can
            unsubscribe at any time.
          </span>
        </label>

        {consentError && (
          <p className="email-field-error" role="alert" aria-live="polite">
            Please tick this box to continue.
          </p>
        )}

        <p className="optin-disclaimer">
          By submitting this form you agree to our{" "}
          <a href="/privacy" className="optin-disclaimer-link">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
