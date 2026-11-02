"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Archivo } from "next/font/google";
import IndexDragIndicator from "./components/indexdragindicator";

// Clear, bold font for the spine titles
const archivo = Archivo({
  weight: ["600", "700"],
  subsets: ["latin"],
});

// Spine colors are taken from each book's real cover (bg = spine, fg = lettering).
// "edge" draws a thin outline on light spines so they don't disappear on the white page.
const books = [
  { slug: "Zap-Zap-ZZZIENNG", title: "Zap Zap Zzziennng!", year: 2025, bg: "#7eb4e0", fg: "#151515", rotate: 10, mdRotate: 6, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[90%]" },
  { slug: "Aza-and-the-magic-doors", title: "Aza and the Magic Doors", year: 2024, bg: "#1C4C8F", fg: "#FFE03A", rotate: 0, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[95%]" },
  { slug: "the-murf", title: "The Murf", year: 2024, bg: "#B7C26A", fg: "#24300C", rotate: -6, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[72%]" },
  { slug: "Zie-wie-je-bent", title: "Be Who You Are, Become Whatever You Want", year: 2021, bg: "#F6E45A", fg: "#C81D25", rotate: 6.5, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[98%]" },
  { slug: "Schelpeneiland", title: "Ora Ubao, Shell Island", year: 2020, bg: "#81CCEB", fg: "#1D2D7A", rotate: 0, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[86%]" },
  { slug: "Friends-Everywhere", title: "Friends Everywhere", year: 2018, bg: "#2F97AB", fg: "#F7E04B", rotate: -5, gapAfter: 1.5, mdClass: "h-[92%] md:w-23 md:h-[80%]" },
  { slug: "What-Does-Kiwi-Want-Now", title: "What Does Kiwi Want Now?", year: 2017, bg: "#3F306E", fg: "#FF9A2E", rotate: 5, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[86%]" },
  { slug: "Ghosts-and-Monsters-Everywhere", title: "Ghosts and Monsters Everywhere", year: 2017, bg: "#FCC51D", fg: "#B9181E", rotate: 0, gapAfter: 2, mdClass: "h-[98%] md:w-23 md:h-[97%]" },
  { slug: "Grandmas-and-Grandpas-Everywhere", title: "Grandmas and Grandpas Everywhere", year: 2016, bg: "#FBFDFE", fg: "#D0202A", edge: true, rotate: -5, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[94%]" },
  { slug: "A-Ray-on-the-Hook", title: "A Ray on the Hook", year: 2015, bg: "#CFE3EF", fg: "#1675C6", edge: true, rotate: 5, gapAfter: 1.5, mdClass: "h-[96%] md:w-23 md:h-[80%]" },
];

const MOBILE_BOOK_WIDTH_REM = 5.5;
const TITLE_MAX_PX = 18; // spine title size when there's room
const TITLE_MIN_PX = 11; // never smaller than this

// Makes every spine title fit: long titles first wrap onto a second line (CSS),
// and only if that's still too big, the letters shrink step by step.
function fitSpineTitles(covers: (HTMLDivElement | null)[]) {
  covers.forEach((cover) => {
    const title = cover?.querySelector<HTMLElement>("[data-spine-title]");
    if (!cover || !title) return;

    let size = TITLE_MAX_PX;
    title.style.fontSize = `${size}px`;
    const fits = () => title.scrollHeight <= title.clientHeight + 1 && title.offsetWidth <= cover.clientWidth - 12;
    while (size > TITLE_MIN_PX && !fits()) {
      size -= 0.5;
      title.style.fontSize = `${size}px`;
    }
  });
}
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
  const dragStartXRef = useRef<number | null>(null);
  const dragStartScrollLeftRef = useRef(0);
  const dragMovedRef = useRef(false);

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

  const recalcOnResize = () => {
    fitSpineTitles(coverRefs.current);
    applyFrame(books.map(targetAngle));
  };

  useEffect(() => {
    fitSpineTitles(coverRefs.current);
    // fit again once the spine font has loaded (its letters are a different width)
    document.fonts?.ready.then(() => fitSpineTitles(coverRefs.current));
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

  // On desktop most people scroll with a mouse wheel (up/down). The books scroll
  // sideways, so translate vertical wheel movement into horizontal scrolling.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let snapTimeout: ReturnType<typeof setTimeout> | undefined;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return; // trackpad sideways swipe already works
      if (el.scrollWidth <= el.clientWidth) return;

      event.preventDefault();
      // switch snapping off while the wheel moves, so it doesn't jump back
      el.style.scrollSnapType = "none";
      el.scrollLeft += event.deltaY;

      clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        el.style.scrollSnapType = "";
      }, 200);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(snapTimeout);
    };
  }, []);

  const scrollToRecentWorks = () => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.6, behavior: "smooth" });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("a")) return;

    const el = carouselRef.current;
    if (!el) return;

    dragMovedRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = el.scrollLeft;
    el.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;

    const el = carouselRef.current;
    if (!el) return;

    const deltaX = event.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      dragMovedRef.current = true;
    }

    el.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  };

  const handlePointerUp = () => {
    dragStartXRef.current = null;
  };

  return (
    <>
      <IndexDragIndicator opacity={stickerOpacity} onClick={scrollToRecentWorks} />

      <main className="relative flex h-[calc(100dvh-4rem)] min-h-0 w-full flex-col overflow-hidden overscroll-none bg-white">
        {/* Monogram behind the books (replaces the big name). The PNG is used as a
            mask, so the color comes from bg-… and can be changed freely. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden aspect-square h-[62%] -translate-x-1/2 -translate-y-1/2 select-none bg-black/90 md:block"
          style={{
            WebkitMaskImage: "url(/logo-monogram.png)",
            maskImage: "url(/logo-monogram.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />

        <div
          ref={carouselRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
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
          className="relative z-10 pb-1 px-.5 flex min-h-0 w-full flex-1 items-end overflow-x-auto overflow-y-hidden snap-x snap-end scrollbar-hide [container-type:inline-size] cursor-grab active:cursor-grabbing"
        >
          <div ref={spacerRef} aria-hidden className="shrink-0 snap-start w-11 md:w-80 lg:w-150 xl:w-230" />

          {books.map((book, i) => (
            <div
              key={i}
              ref={(el) => { wrapperRefs.current[i] = el; }}
              className={`relative h-[99%] shrink-0 snap-center w-[var(--mobile-book-width)] md:w-20 ${book.mdClass ?? ""}`}
              style={{ "--mobile-book-width": `${MOBILE_BOOK_WIDTH_REM}rem` } as React.CSSProperties}
            >
              <Link
                href={`/books/${book.slug}`}
                aria-label={`${book.title}, ${book.year}`}
                className="block h-full w-full cursor-pointer transition-[translate] duration-300 ease-out hover:-translate-y-3 focus-visible:-translate-y-3"
                onClick={(event) => {
                  if (dragMovedRef.current) {
                    event.preventDefault();
                    dragMovedRef.current = false;
                  }
                }}
              >
                {/* The spine: cover colors, title centered (reads bottom to top), year at the bottom */}
                <div
                  ref={(el) => { coverRefs.current[i] = el; }}
                  className="book-cover relative flex h-full w-full items-center justify-center px-1.5 pb-10 pt-4"
                  style={{
                    backgroundColor: book.bg,
                    color: book.fg,
                    boxShadow: book.edge ? "inset 0 0 0 1px rgb(0 0 0 / 0.12)" : undefined,
                  }}
                >
                  <p
                    data-spine-title
                    className={`${archivo.className} max-h-full text-center font-bold uppercase leading-[1.15] tracking-[0.07em] [text-wrap:balance]`}
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: TITLE_MAX_PX }}
                  >
                    {book.title}
                  </p>
                  <span className={`${archivo.className} absolute bottom-3 left-0 right-0 text-center text-xs font-semibold tracking-wider opacity-85`}>
                    {book.year}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}