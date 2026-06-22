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
        <a
          href="https://www.instagram.com/sunsetr1der/reels/"
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
