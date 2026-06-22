import { readFileSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Sunsetrider Media",
};

export default function PrivacyPage() {
  const html = readFileSync(join(process.cwd(), "privacy.html"), "utf-8");

  return (
    <main className="privacy-page">
      <div className="privacy-wrap">
        <a href="/" className="privacy-back">
          ← Back
        </a>
        <div
          className="privacy-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </main>
  );
}
