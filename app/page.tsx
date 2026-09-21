"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { Libre_Caslon_Text } from "next/font/google";
import IndexDragIndicator from "./components/indexdragindicator";

const janeAust = localFont({
  src: "./fonts/JaneAust.ttf",
});

const LibreCaslonText = Libre_Caslon_Text({
  weight: "700",
  subsets: ["latin"],
});

const books = [
  { slug: "Zap-Zap-ZZZIENNG", title: "Zap Zap Zzziennng!", year: 2025, color: "#EAC342", rotate: 10, mdRotate: 6, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[98%]" },
  { slug: "Aza-and-the-magic-doors", title: "Aza and the Magic Doors", year: 2024, color: "#2E9EFF", rotate: 0, gapAfter: 1.5, mdClass: " h-[98%] md:w-23 md:h-[95%]" },
  { slug: "the-murf", title: "The Murf", year: 2024, color: "#A4C639", rotate: -6, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[75%]" },
  { slug: "Zie-wie-je-bent", title: "Be who you are, become what you want to be", year: 2021, color: "#F8EC62", rotate: 6.5, gapAfter: 1.5, mdClass: "h-[92%] md:w-23 md:h-[85%]" },
  { slug: "Schelpeneiland", title: "Shell Island", year: 2021, color: "#56C3EE", rotate: 0, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[93%]" },
  { slug: "Friends-Everywhere", title: "Friends Everywhere", year: 2018, color: "#E789B6", rotate: -5, gapAfter: 1.5, mdClass: "md:w-23 md:h-[75%]" },
  { slug: "What-Does-Kiwi-Want-Now", title: "What does Kiwi want now?", year: 2018, color: "#FE7C02", rotate: 5, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[85%]" },
  { slug: "Ghosts-and-Monsters-Everywhere", title: "Ghosts and Monsters Everywhere", year: 2017, color: "#CE181B", rotate: 0, gapAfter: 2, mdClass: "h-[98%] md:w-23 md:h-[97%]" },
  { slug: "Grandmas-and-Grandpas-Everywhere", title: "Grandmas and Grandpas Everywhere", year: 2016, color: "#96D4E3", rotate: -5, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[92%]" },
  { slug: "A-Ray-on-the-Hook", title: "A Ray on the Hook", year: 2015, color: "#FAF292", rotate: 5, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[85%]" },
];

const MOBILE_BOOK_WIDTH_REM = 5.5;
const LEAN_STAGGER_MS = 90;
const LEAN_DURATION_MS = 1200;
const totalLeanMs = (books.length - 1) * LEAN_STAGGER_MS + LEAN_DURATION_MS;

// Exact max horizontal reach of a rectangle pivoting on a bottom corner.
function reach(width: number, height: number, angleDeg: number) {
  const rad = (Math.abs(angleDeg) * Math.PI) / 180;
  return width * Math.cos(rad) + height * Math.sin(rad);
}

function targetAngle(book: (typeof books)[number]) {
  const isMdUp = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
  return isMdUp ? book.mdRotate ?? book.rotate ?? 0 : book.rotate ?? 0;
}

export default function BookCarousel() {
  const [stickerOpacity, setStickerOpacity] = useState(1);

  const carouselRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const baselineScrollLeft = useRef(0);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coverRefs = useRef<(HTMLDivElement | null)[]>([]);

  const applyFrame = (angles: number[]) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

    angles.forEach((angle, i) => {
      const cover = coverRefs.current[i];
      if (!cover) return;
      cover.style.transformOrigin = angle > 0.01 ? "bottom left" : angle < -0.01 ? "bottom right" : "bottom center";
      cover.style.transform = `rotate(${angle}deg)`;
    });

    for (let i = 0; i < books.length; i++) {
      const wrapper = wrapperRefs.current[i];
      const cover = coverRefs.current[i];
      const nextCover = coverRefs.current[i + 1];
      if (!wrapper || !cover) continue;

      const angle = angles[i];
      const w = cover.offsetWidth;
      const h = cover.offsetHeight;
      const rightExtra = angle > 0 ? reach(w, h, angle) - w : 0;

      let leftExtra = 0;
      const nextAngle = angles[i + 1];
      if (nextCover && nextAngle < 0) {
        leftExtra = reach(nextCover.offsetWidth, nextCover.offsetHeight, nextAngle) - nextCover.offsetWidth;
      }

      const baselinePx = (books[i].gapAfter ?? 1) * rootFontSize;
      wrapper.style.marginRight = `${Math.max(baselinePx, rightExtra + leftExtra)}px`;
    }
  };

  const runLeanAnimation = () => {
    const start = performance.now();
    const targets = books.map(targetAngle);

    const frame = (now: number) => {
      const elapsed = now - start;
      let active = false;

      const angles = books.map((_, i) => {
        const target = targets[i];
        if (target === 0) return 0;
        const t = Math.max(0, Math.min(1, (elapsed - i * LEAN_STAGGER_MS) / LEAN_DURATION_MS));
        if (t < 1) active = true;
        const eased = 1 - Math.pow(1 - t, 3);
        return target * eased;
      });

      applyFrame(angles);
      if (active || elapsed < totalLeanMs) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  };

  const recalcOnResize = () => applyFrame(books.map(targetAngle));

  useEffect(() => {
    applyFrame(books.map(() => 0)); // render straight first
    requestAnimationFrame(() => runLeanAnimation()); // then lean, no drop/fade
    window.addEventListener("resize", recalcOnResize);
    return () => window.removeEventListener("resize", recalcOnResize);
  }, []);

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
        <p className={`${janeAust.className} pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden -translate-y-1/2 select-none whitespace-nowrap text-center text-black/90 md:block md:text-6xl lg:text-9xl`}>
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
          className="relative z-10 pb-1 px-.5 flex min-h-0 w-full flex-1 items-end overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide [container-type:inline-size]"
        >
          <div ref={spacerRef} aria-hidden className="shrink-0 snap-start w-11 md:w-80 lg:w-150 xl:w-230" />

          {books.map((book, i) => (
            <div
              key={i}
              ref={(el) => { wrapperRefs.current[i] = el; }}
              className={`relative h-[99%] shrink-0 snap-center w-[var(--mobile-book-width)] md:w-20 ${book.mdClass ?? ""}`}
              style={{ "--mobile-book-width": `${MOBILE_BOOK_WIDTH_REM}rem` } as React.CSSProperties}
            >
              {book.slug ? (
                <Link
                  href={`/books/${book.slug}`}
                  className="block h-full w-full cursor-pointer"
                >
                  <div
                    ref={(el) => { coverRefs.current[i] = el; }}
                    className="book-cover flex h-full w-full justify-center shadow-lg"
                    style={{ backgroundColor: book.color } as React.CSSProperties}
                  >
                    <p
                      className={`${LibreCaslonText.className} whitespace-nowrap p-5 text-lg md:text-xl text-black`}
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {book.title} <span className="text-sm font-normal">{book.year}</span>
                    </p>
                  </div>
                </Link>
              ) : (
                <div
                ref={(el) => { coverRefs.current[i] = el; }}
                className="book-cover flex h-full w-full justify-center shadow-lg"
                style={{ backgroundColor: book.color } as React.CSSProperties}
              >
                <p
                  className={`${LibreCaslonText.className} whitespace-nowrap p-5 text-lg text-normal`}
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {book.title} <span className="text-sm font-normal">{book.year}</span>
                </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}