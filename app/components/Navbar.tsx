import Image from "next/image";

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
        <div className="navbar-wordmark">
          <span className="navbar-wordmark-top">Sunsetrider</span>
          <div className="navbar-wordmark-bottom" aria-label="Media">
            {["M", "E", "D", "I", "A"].map((c, i) => (
              <span key={i} aria-hidden="true">{c}</span>
            ))}
          </div>
        </div>
      </a>
    </header>
  );
}
