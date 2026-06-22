"use client";

import { useState } from "react";
import EmailForm from "./EmailForm";

function TickIcon() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="26"
        cy="26"
        r="24"
        stroke="oklch(0.553 0.205 32.4)"
        strokeWidth="1.5"
      />
      <path
        d="M15 26l8 8 14-14"
        stroke="oklch(0.553 0.205 32.4)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SignupSection() {
  const [succeeded, setSucceeded] = useState(false);

  return (
    <section className="py-28 px-6 md:py-40 text-center bg-panel">
      {succeeded ? (
        <div className="signup-success">
          <TickIcon />
          <h2
            className="font-condensed font-black uppercase leading-none tracking-[-0.02em] text-ink text-balance"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}
          >
            You&rsquo;re in the room
          </h2>
        </div>
      ) : (
        <>
          <h2
            className="font-condensed font-black uppercase leading-none tracking-[-0.02em] text-ink text-balance"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}
          >
            Stay in the room
          </h2>
          <p
            className="mt-4 text-dim"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
          >
            Be first to know when we open the doors.
          </p>
          <div className="mt-10 mx-auto max-w-md">
            <EmailForm onSuccess={() => setSucceeded(true)} />
            <p className="mt-4 text-dim/50 text-xs">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
