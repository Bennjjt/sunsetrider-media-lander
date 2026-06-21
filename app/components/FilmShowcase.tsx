"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Film {
  id: string;
  title: string;
  series: string;
  year: number | null;
  genre: string;
  runtime: string;
  synopsis: string;
  posterSrc: string;
  posterWidth: number;
  posterHeight: number;
  trailerSrc: string;
  imdbUrl: string;
  posterSide: "left" | "right";
  bgVariant: "canvas" | "panel";
}

const FILMS: Film[] = [
  {
    id: "kl",
    title: "Killing Lionel",
    series: "I / II",
    year: 2019,
    genre: "Crime Thriller",
    runtime: "90 min",
    synopsis:
      "After double-crossing local gangster Jack Crooks, abusive husband Lionel knows the net is closing in on him. Henchmen Eddie Bell and Percival Sullivan have him in their sights, and it's only a matter of time before they turn his lights out for good. His long-suffering wife Peaches also has her mind set on his demise — with the help of the weird and eccentric Dr Henrick Oldcorn, she sets the wheels in motion. Lionel knows his days are numbered. He isn't about to hang around to see who gets him first.",
    posterSrc: "/posters/kl-poster.webp",
    posterWidth: 2175,
    posterHeight: 3150,
    trailerSrc: "https://pvyl9ubvvdzwpsbc.public.blob.vercel-storage.com/killing-lionel-trailer.mp4",
    imdbUrl: "https://www.imdb.com/title/tt3796088",
    posterSide: "left",
    bgVariant: "canvas",
  },
  {
    id: "cd",
    title: "Card Dead",
    series: "II / II",
    year: null,
    genre: "Crime · Poker Thriller",
    runtime: "85 min",
    synopsis:
      "Released from prison having served three of a five-year sentence, Woody walks out looking for one thing. Closure. He visits his old boss Jack Crooks with a proposition — a high-stakes poker game. Eyes are watched, cards are dealt, old scores wait to be settled. Eagle-eyed viewers of Killing Lionel will pick up the crossover references. Both films work without each other. They also tie together nicely.",
    posterSrc: "/posters/card-dead-poster.jpg",
    posterWidth: 1125,
    posterHeight: 1500,
    trailerSrc: "https://pvyl9ubvvdzwpsbc.public.blob.vercel-storage.com/card-dead-trailer.mp4",
    imdbUrl: "https://www.imdb.com/title/tt5554082",
    posterSide: "right",
    bgVariant: "panel",
  },
];

function FilmEntry({ film }: { film: Film }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(true);
      return;
    }
    const el = rowRef.current;
    if (!el) return;

    setAnimate(true);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      videoRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (videoRef.current) videoRef.current.pause();
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [modalOpen]);

  const isRight = film.posterSide === "right";

  const classes = [
    "showcase-film",
    isRight && "showcase-film--right",
    film.bgVariant === "panel" && "showcase-film--panel",
    animate && "will-animate",
    revealed && "is-revealed",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div ref={rowRef} className={classes}>
        {/* ── POSTER ── */}
        <div className="showcase-poster-col">
          <Image
            src={film.posterSrc}
            alt={`${film.title} — film poster`}
            width={film.posterWidth}
            height={film.posterHeight}
            className="showcase-poster-img"
            sizes="(max-width: 768px) 72vw, 40vw"
          />
        </div>

        {/* ── TEXT ── */}
        <div className="showcase-text-col">
          <p className="showcase-series" aria-label={`Film ${film.series}`}>
            {film.series}
          </p>
          <h2 className="showcase-title">{film.title}</h2>
          <p className="showcase-meta">
            {[film.genre, film.runtime, film.year].filter(Boolean).join(" · ")}
          </p>
          <p className="showcase-synopsis">{film.synopsis}</p>
          <button
            className="showcase-trailer-link"
            onClick={() => setModalOpen(true)}
            aria-label={`Watch the trailer for ${film.title}`}
          >
            Watch Trailer
            <ArrowIcon />
          </button>

          <a
            href={film.imdbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="showcase-imdb-link"
            aria-label={`${film.title} on IMDb`}
          >
            <ImdbIcon />
          </a>
        </div>
      </div>

      {/* ── TRAILER MODAL ── */}
      {modalOpen && (
        <div
          className="trailer-modal-backdrop"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${film.title} — trailer`}
        >
          <div
            className="trailer-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close trailer"
            >
              <CloseIcon />
              <span>Close</span>
            </button>
            <video
              ref={videoRef}
              className="trailer-modal-video"
              src={film.trailerSrc}
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

export default function FilmShowcase() {
  return (
    <section aria-label="The films">
      {FILMS.map((film, i) => (
        <div key={film.id}>
          {i > 0 && <hr className="section-rule" />}
          <FilmEntry film={film} />
        </div>
      ))}
    </section>
  );
}

function ImdbIcon() {
  return (
    <svg
      width="36"
      height="18"
      viewBox="0 0 36 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="18" rx="3" fill="#F5C518" />
      <text
        x="4"
        y="13.5"
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        fontSize="11"
        fill="#000000"
        letterSpacing="0.2"
      >
        IMDb
      </text>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 5.5h16M12 1l5 4.5-5 4.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1L13 13M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
