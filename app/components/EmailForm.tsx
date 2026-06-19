"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function EmailForm() {
  const [state, handleSubmit] = useForm("emailSignup");
  const [consented, setConsented] = useState(false);
  const [consentError, setConsentError] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!consented) {
      e.preventDefault();
      setConsentError(true);
      return;
    }
    setConsentError(false);
    return handleSubmit(e);
  }

  if (state.succeeded) {
    return (
      <p
        className="text-brand font-condensed font-bold text-xl tracking-wide uppercase"
        aria-live="polite"
      >
        You&rsquo;re in the room.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="email-signup" className="sr-only">
          Email address
        </label>
        <input
          id="email-signup"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          className="email-input flex-1"
          disabled={state.submitting}
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

      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
        className="email-field-error"
      />

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
