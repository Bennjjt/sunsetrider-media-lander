import Image from "next/image";
import HeroSection from "./components/HeroSection";
import FilmShowcase from "./components/FilmShowcase";
import SignupSection from "./components/SignupSection";

function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16.6 5.82a4.28 4.28 0 0 1-2.66-2.66h-2.94v12.1a2.6 2.6 0 1 1-2.6-2.6c.22 0 .43.02.63.07V9.7a5.55 5.55 0 0 0-.63-.04A5.57 5.57 0 1 0 14 15.23v-6.1a7.18 7.18 0 0 0 4.2 1.34V7.5a4.27 4.27 0 0 1-1.6-1.68z" />
    </svg>
  );
}

function FacebookIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14.5 8.5h2V5.5h-2c-2.2 0-3.5 1.49-3.5 3.6V11H9v3h2v6h3v-6h2.2l.6-3H14v-1.4c0-.83.34-1.1 1-1.1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      {/* ── SPLIT-SCREEN HERO (+ intro animation) ── */}
      <HeroSection />

      <hr className="section-rule" />

      {/* ── FILM SHOWCASE ── */}
      <FilmShowcase />

      <hr className="section-rule" />

      {/* ── PLATFORM BRIEF ── */}
      {/* <section className="py-28 px-6 md:py-40 text-center">
        <p
          className="mx-auto max-w-[52ch] text-dim leading-relaxed text-pretty"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
        >
          Sunsetrider Media is building a direct distribution platform for
          independent filmmakers — a place where creators host their work and
          audiences pay to watch it. No middlemen. No noise. Just films that
          deserve an audience.
        </p>
      </section> */}

      <hr className="section-rule" />

      {/* ── INSTAGRAM ── */}
      <section
        className="py-24 px-6 md:py-32"
        aria-labelledby="instagram-heading"
      >
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2
              id="instagram-heading"
              className="font-condensed font-bold uppercase tracking-[-0.01em] text-ink"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Instagram
            </h2>
            <a
              href="https://www.instagram.com/sunsetr1der/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-dim hover:text-ink transition-colors duration-200 text-sm font-condensed tracking-[0.1em] uppercase"
              aria-label="Follow Sunsetrider Media on Instagram"
            >
              <InstagramIcon size={18} />
              <span>Follow</span>
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }}>
            {[
              "onset-01","onset-02","onset-03",
              "onset-04","onset-05","onset-06",
              "onset-07","onset-08","onset-09",
            ].map((name) => (
              <a
                key={name}
                href="https://www.instagram.com/sunsetr1der/reels/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on Instagram"
                style={{ position: "relative", display: "block", aspectRatio: "1", overflow: "hidden" }}
                className="onset-cell"
              >
                <Image
                  src={`/on-set/web/${name}.webp`}
                  alt="On set"
                  fill
                  className="onset-img"
                  sizes="(max-width: 640px) 33vw, 22vw"
                />
                <div className="onset-overlay" aria-hidden="true">
                  <InstagramIcon size={20} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-rule" />

      {/* ── EMAIL SIGNUP ── */}
      <SignupSection />

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between border-t border-panel/60">
        <span className="text-dim text-xs font-condensed tracking-[0.1em] uppercase">
          © 2026 Sunsetrider Media
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/sunsetr1der/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-ink transition-colors duration-200"
            aria-label="Sunsetrider Media on Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.tiktok.com/@sunsetr1der7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-ink transition-colors duration-200"
            aria-label="Sunsetrider Media on TikTok"
          >
            <TikTokIcon />
          </a>
          <a
            href="https://www.facebook.com/share/197NK2SfWV/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-ink transition-colors duration-200"
            aria-label="Sunsetrider Media on Facebook"
          >
            <FacebookIcon />
          </a>
        </div>
      </footer>
    </main>
  );
}
