import Image from "next/image";

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

export default function Navbar() {
  return (
    <header className="navbar">
      <a href="/" aria-label="Sunsetrider Media — home" className="navbar-brand">
        <Image
          src="/newlogo.png"
          alt=""
          width={1254}
          height={1254}
          className="navbar-logo"
          priority
        />
        <h1 className="navbar-wordmark">
          <span className="navbar-wordmark-top">Sunsetrider</span>
          <span className="navbar-wordmark-bottom" aria-label="Media">
            {["M", "E", "D", "I", "A"].map((c, i) => (
              <span key={i} aria-hidden="true">{c}</span>
            ))}
          </span>
        </h1>
      </a>
      <div className="navbar-social">
        <a
          href="https://www.instagram.com/sunsetr1der/reels/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sunsetrider Media on Instagram"
        >
          <InstagramIcon size={20} />
        </a>
        <a
          href="https://www.tiktok.com/@sunsetr1der7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sunsetrider Media on TikTok"
        >
          <TikTokIcon size={20} />
        </a>
        <a
          href="https://www.facebook.com/share/197NK2SfWV/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sunsetrider Media on Facebook"
        >
          <FacebookIcon size={20} />
        </a>
      </div>
    </header>
  );
}
