"use client";

import { useEffect, useRef, useState } from "react";
import IndexDragIndicator from "./components/indexdragindicator";

const books = [
  { title: "Zap Zap Zzziennng!", year: 2025, color: "#EAC342", rotate: 10, mdRotate: 6, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[98%]" },
  { title: "Aza and the Magic Doors", year: 2024, color: "#2E9EFF", rotate: 0, gapAfter: 1.5, mdClass: " h-[98%] md:w-23 md:h-[95%]" },
  { title: "Book Three", year: 2023, color: "#A4C639", rotate: -6, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[75%]" },
  { title: "Book Four", year: 2022, color: "#EAC342", rotate: 6.5, gapAfter: 1.5, mdClass: "h-[92%] md:w-23 md:h-[85%]" },
  { title: "Book Five", year: 2021, color: "#2E9EFF", rotate: 0, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[93%]" },
  { title: "Book Six", year: 2021, color: "#2E9E", rotate: -5, gapAfter: 1.5, mdClass: "md:w-23 md:h-[75%]" },
  { title: "Book Seven", year: 2021, color: "#23c5", rotate: 5, gapAfter: 1.5, mdClass: "h-[98%] md:w-23 md:h-[85%]" },
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
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = carouselRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = el.scrollLeft;
    el.style.scrollSnapType = "none";
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = carouselRef.current;
    if (!el) return;
    el.scrollLeft = dragStartScrollLeftRef.current - (e.clientX - dragStartXRef.current);
  };

  const endDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (carouselRef.current) carouselRef.current.style.scrollSnapType = "";
  };

  return (
    <>
      <IndexDragIndicator opacity={stickerOpacity} />

      <main className="relative flex h-[calc(100dvh-4rem)] min-h-0 w-full flex-col overflow-hidden overscroll-none bg-white">
        <p className="pointer-events-none absolute inset-x-0 top-1/3 z-0 select-none text-center font-serif italic text-6xl lg:text-9xl text-black/90 whitespace-nowrap">
          Liliana Erasmus
        </p>

        <div
          ref={carouselRef}
          onScroll={(event) => {
            const container = event.currentTarget;
            const delta = container.scrollLeft - baselineScrollLeft.current;
            if (delta <= 0) { setStickerOpacity(1); return; }
            const fadeDistance = (spacerRef.current?.offsetWidth ?? 180) * 0.5;
            setStickerOpacity(Math.max(0, 1 - delta / fadeDistance));
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          className="relative z-10 pb-1 px-.5 flex min-h-0 w-full flex-1 items-end overflow-x-auto overflow-y-hidden snap-x snap-mandatory  scrollbar-hide [container-type:inline-size] cursor-grab active:cursor-grabbing select-none"
        >
          <div ref={spacerRef} aria-hidden className="shrink-0 snap-start w-11 md:w-80 lg:w-180 xl:w-300" />

          {books.map((book, i) => (
            <div
              key={i}
              ref={(el) => { wrapperRefs.current[i] = el; }}
              className={`relative h-[99%] shrink-0 snap-center w-[var(--mobile-book-width)] md:w-20 ${book.mdClass ?? ""}`}
              style={{ "--mobile-book-width": `${MOBILE_BOOK_WIDTH_REM}rem` } as React.CSSProperties}
            >
              <div
                ref={(el) => { coverRefs.current[i] = el; }}
                className="book-cover flex h-full w-full justify-center outline shadow-lg"
                style={{ backgroundColor: book.color } as React.CSSProperties}
              >
                <p className="whitespace-nowrap p-5 text-lg font-semibold text-black" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  {book.title} <span className="text-sm font-normal">{book.year}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}