import HeroSection from "./components/HeroSection";
import FilmShowcase from "./components/FilmShowcase";
import EmailForm from "./components/EmailForm";

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
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-10">
            <h2
              id="instagram-heading"
              className="font-condensed font-bold uppercase tracking-[-0.01em] text-ink"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Instagram
            </h2>
            <a
              href="https://instagram.com/sunsetrider.media"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-dim hover:text-ink transition-colors duration-200 text-sm font-condensed tracking-[0.1em] uppercase"
              aria-label="Follow Sunsetrider Media on Instagram"
            >
              <InstagramIcon size={18} />
              <span>Follow</span>
            </a>
          </div>

          {/* Feed placeholder grid — replace with embedded feed once linked */}
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="instagram-placeholder"
                aria-hidden="true"
              >
                <InstagramIcon size={24} />
                <span
                  className="text-dim/50 text-[0.65rem] font-condensed tracking-[0.15em] uppercase"
                >
                  Coming soon
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-dim/60 text-xs font-condensed tracking-[0.1em] uppercase">
            Live feed will appear here once connected
          </p>
        </div>
      </section>

      <hr className="section-rule" />

      {/* ── EMAIL SIGNUP ── */}
      <section className="py-28 px-6 md:py-40 text-center bg-panel">
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
          <EmailForm />
          <p className="mt-4 text-dim/50 text-xs">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between border-t border-panel/60">
        <span className="text-dim text-xs font-condensed tracking-[0.1em] uppercase">
          © 2026 Sunsetrider Media
        </span>
        <a
          href="https://instagram.com/sunsetrider.media"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim hover:text-ink transition-colors duration-200"
          aria-label="Sunsetrider Media on Instagram"
        >
          <InstagramIcon />
        </a>
      </footer>
    </main>
  );
}
