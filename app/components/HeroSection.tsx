"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";

interface Film {
  id: string;
  title: string;
  series: string;
  total: string;
  year?: number;
  genre: string;
  runtime: string;
  clipSrc: string;   // 12-second loop for the background
  trailerSrc: string; // full trailer for the modal
  posterSrc?: string;
}

const FILMS: Film[] = [
  {
    id: "kl",
    title: "Killing Lionel",
    series: "I",
    total: "II",
    year: 2019,
    genre: "Crime Thriller",
    runtime: "90 min",
    clipSrc: "https://pvyl9ubvvdzwpsbc.public.blob.vercel-storage.com/killing-lionel-clip.mp4",
    trailerSrc: "https://pvyl9ubvvdzwpsbc.public.blob.vercel-storage.com/killing-lionel-trailer.mp4",
  },
  {
    id: "cd",
    title: "Card Dead",
    series: "II",
    total: "II",
    genre: "Crime Poker Thriller",
    runtime: "85 min",
    clipSrc: "https://pvyl9ubvvdzwpsbc.public.blob.vercel-storage.com/card-dead-clip.mp4",
    trailerSrc: "https://pvyl9ubvvdzwpsbc.public.blob.vercel-storage.com/card-dead-trailer.mp4",
    posterSrc: "/posters/card-dead-poster.jpg",
  },
];

type Phase = "intro" | "exiting" | "hero";

export default function HeroSection() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [modalFilm, setModalFilm] = useState<Film | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [logoSize, setLogoSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (wordmarkRef.current) {
      setLogoSize(wordmarkRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setPhase("hero");
      return;
    }
    const exitTimer = setTimeout(() => setPhase("exiting"), 2500);
    const heroTimer = setTimeout(() => setPhase("hero"), 3400);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(heroTimer);
    };
  }, []);

  useEffect(() => {
    if (modalFilm) {
      modalVideoRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalFilm]);

  useEffect(() => {
    if (!modalFilm) return;
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") setModalFilm(null); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [modalFilm]);

  const openModal = useCallback((film: Film) => setModalFilm(film), []);

  return (
    <>
      {/* ── INTRO OVERLAY ── */}
      {phase !== "hero" && (
        <div
          className={`hero-intro${phase === "exiting" ? " hero-intro--exit" : ""}`}
          aria-hidden="true"
        >
          <div className="intro-lockup">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/newlogo.png"
              className="intro-lockup-logo"
              style={logoSize ? { width: logoSize, height: logoSize } : undefined}
              alt=""
              aria-hidden="true"
            />
            <div className="navbar-wordmark" ref={wordmarkRef}>
              <span className="navbar-wordmark-top">Sunsetrider</span>
              <div className="navbar-wordmark-bottom" aria-label="Media">
                {["M", "E", "D", "I", "A"].map((c, i) => (
                  <span key={i} aria-hidden="true">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SPLIT-SCREEN HERO ── */}
      <section
        className="split-hero"
        aria-label="Featured films"
        onMouseLeave={() => setHoveredSide(null)}
      >
        {FILMS.map((film, i) => {
          const side = i === 0 ? "left" : "right";
          const isHovered = hoveredSide === side;
          const isContracted = hoveredSide !== null && !isHovered;

          return (
            <div
              key={film.id}
              className={["split-side", isHovered && "expanded", isContracted && "contracted"]
                .filter(Boolean).join(" ")}
              onMouseEnter={() => setHoveredSide(side)}
            >
              {/* Looping background clip */}
              <video
                className="split-video"
                src={film.clipSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              />

              {/* Dark gradient overlay */}
              <div className="split-overlay" aria-hidden="true" />

              {/* Left–right divider */}
              {i === 0 && <div className="split-divider" aria-hidden="true" />}

              {/* Center content: series · title · subtitle · play */}
              <div className={`split-content${isContracted ? " contracted" : ""}`}>
                <p className="series-indicator-inline">
                  {film.series}&thinsp;/&thinsp;{film.total}
                </p>
                <h2 className="film-title-overlay">{film.title}</h2>
                <p className="film-subtitle-overlay">
                  {[film.year, film.genre, film.runtime].filter(Boolean).join(" · ")}
                </p>

                <button
                  className="play-btn"
                  onClick={() => openModal(film)}
                  aria-label={`Watch the trailer for ${film.title}`}
                >
                  <span className="play-circle" aria-hidden="true">
                    <PlayIcon />
                  </span>
                  <span className="play-label">Watch the Trailer</span>
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── TRAILER MODAL ── */}
      {modalFilm && (
        <div
          className="trailer-modal-backdrop"
          onClick={() => setModalFilm(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${modalFilm.title} — trailer`}
        >
          <div className="trailer-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalFilm(null)} aria-label="Close trailer">
              <CloseIcon />
              <span>Close</span>
            </button>
            <video
              ref={modalVideoRef}
              className="trailer-modal-video"
              src={modalFilm.trailerSrc}
              controls
              autoPlay
              preload="auto"
              tabIndex={0}
            />
          </div>
        </div>
      )}
    </>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M6.5 4.5L13.5 9L6.5 13.5V4.5Z" fill="oklch(0.94 0.008 225)" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
