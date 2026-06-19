"use client";

import { useForm, ValidationError } from "@formspree/react";

export default function EmailForm() {
  const [state, handleSubmit] = useForm("emailSignup");

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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

      <label className="optin-label">
        <input
          type="checkbox"
          name="marketing_consent"
          value="yes"
          required
          className="optin-checkbox"
          disabled={state.submitting}
          aria-describedby="optin-desc"
        />
        <span id="optin-desc" className="optin-text">
          I agree to receive updates from Sunsetrider Media. You can unsubscribe
          at any time.
        </span>
      </label>

      <ValidationError
        prefix="Consent"
        field="marketing_consent"
        errors={state.errors}
        className="email-field-error"
      />
    </form>
  );
}
