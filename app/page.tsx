"use client";

import { useEffect, useRef, useState } from "react";
import IndexDragIndicator from "./components/indexdragindicator";

const books = [
  {
    title: "Zap Zap Zzziennng!",
    year: 2025,
    color: "#EAC342",
    rotate: 10,
    mdRotate: 6,
    gapAfter: 6.8, // now in rem, not vw
    mdGapAfter: 8.3,
    mdClass: "h-[93%] md:w-12 md:h-[98%]",
    lgGapAfter: 6.3,
  },
  {
    title: "Aza and the Magic Doors",
    year: 2024,
    color: "#2E9EFF",
    gapAfter: 4.1,
    mdGapAfter: 6.6,
    lgGapAfter: 4.9,
    mdClass: " h-[98%] md:w-12 md:h-[95%]",
  },
  {
    title: "Book Three",
    year: 2023,
    color: "#A4C639",
    rotate: -6,
    gapAfter: 1,
    mdGapAfter: 8,
    lgGapAfter: 4.7,
    mdClass: "h-[98%] md:w-5 md:h-[75%]",
  },
  {
    title: "Book Four",
    year: 2022,
    color: "#EAC342",
    rotate: 6.5,
    gapAfter: 4.4,
    mdGapAfter: 8,
    lgGapAfter: 6,
    mdClass: "h-[92%] md:w-5 md:h-[85%]",
  },
  {
    title: "Book Five",
    year: 2021,
    color: "#2E9EFF",
    rotate: 0,
    gapAfter: 3.4,
    mdGapAfter: 5.5,
    lgGapAfter: 4.1,
    mdClass: "h-[89%] md:w-5 md:h-[93%]",
  },
  {
    title: "Book Six",
    year: 2021,
    color: "#2E9E",
    rotate: -5,
    gapAfter: 3,
    mdGapAfter: 12,
    lgGapAfter: 4,
    mdClass: "md:w-5 md:h-[75%]",
  },
  {
    title: "Book Seven",
    year: 2021,
    color: "#23c5",
    rotate: 5,
    gapAfter: 0,
    mdGapAfter: 0,
    mdClass: "h-[98%] md:w-6 md:h-[85%]",
  },
];

// Fixed mobile book width — same on every phone, in rem.
const MOBILE_BOOK_WIDTH_REM = 4;

export default function BookCarousel() {
  const [stickerOpacity, setStickerOpacity] = useState(1);

  const carouselRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const baselineScrollLeft = useRef(0);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    el.scrollTo({ left: 0 });

    requestAnimationFrame(() => {
      baselineScrollLeft.current = el.scrollLeft;
      setStickerOpacity(1);
    });
  }, []);

  return (
    <>
      <IndexDragIndicator opacity={stickerOpacity} />

      <main className="relative flex h-[calc(100dvh-4rem)] min-h-0 w-full flex-col overflow-hidden overscroll-none bg-white">

        <p className="pointer-events-none absolute inset-x-0 top-1/3 z-0 select-none text-center font-serif italic text-6xl md:text-8xl lg:text-9xl text-black/90 whitespace-nowrap ">
          Liliana Erasmus
        </p>

        <div
  ref={carouselRef}
  onScroll={(event) => {
    const container = event.currentTarget;
    const delta = container.scrollLeft - baselineScrollLeft.current;

    if (delta <= 0) {
      setStickerOpacity(1);
      return;
    }

    const fadeDistance = (spacerRef.current?.offsetWidth ?? 180) * 0.5;
    setStickerOpacity(Math.max(0, 1 - delta / fadeDistance));
  }}
  className="relative z-10 flex min-h-0 w-full flex-1 items-end overflow-x-auto overflow-y-hidden snap-x snap-mandatory px-6 scrollbar-hide [container-type:inline-size]"
>
  {/* Leading spacer — the intro gap, and itself a valid snap point */}
  <div ref={spacerRef} aria-hidden className="shrink-0 snap-start w-11 md:w-80 lg:w-[70vw]" />
          {books.map((book, i) => (
  <div
    key={i}
    className={`relative h-[99%] shrink-0 snap-center mr-[var(--mobile-gap)] md:mr-[var(--desktop-gap)] w-[var(--mobile-book-width)] lg:mr-[var(--lg-gap)] md:w-20 ${book.mdClass ?? ""}`}
    style={
      {
        "--mobile-book-width": `${MOBILE_BOOK_WIDTH_REM}rem`,
        "--mobile-gap": `${book.gapAfter}rem`,
        "--desktop-gap": `${book.mdGapAfter}vw`,
        "--lg-gap": `${book.lgGapAfter}vw`,
      } as React.CSSProperties
    }
  >
    <div
      className="book-cover flex h-full w-full justify-center outline shadow-lg"
      style={
        {
          backgroundColor: book.color,
          "--book-rotate": `${book.rotate ?? 0}deg`,
          "--book-md-rotate": `${book.mdRotate ?? book.rotate ?? 0}deg`,
        } as React.CSSProperties
      }
    >
      <p
        className="whitespace-nowrap p-5 text-lg font-semibold text-black"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {book.title}{" "}
        <span className="text-sm font-normal">{book.year}</span>
      </p>
    </div>
  </div>
))}
        </div>
      </main>
    </>
  );
}