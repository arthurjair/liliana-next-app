"use client";

import { useEffect, useRef, useState } from "react";
import IndexDragIndicator from "./components/indexdragindicator";

const books = [
  {
    title: "Zap Zap Zzziennng!",
    year: 2025,
    color: "#EAC342",
    rotate: 10,
    gapAfter: 144,
    mdGapAfter: 155,
    mdClass: "md:w-23 md:h-[98%]",
  },
  {
    title: "Aza and the Magic Doors",
    year: 2024,
    color: "#2E9EFF",
    gapAfter: 86,
    mdGapAfter: 72,
    mdClass: "md:w-23 md:h-[95%]",
  },
  {
    title: "Book Three",
    year: 2023,
    color: "#A4C639",
    rotate: -6,
    gapAfter: 16,
    mdGapAfter: 12,
    mdClass: "md:w-23 md:h-[75%]",
  },
  {
    title: "Book Four",
    year: 2022,
    color: "#EAC342",
    rotate: 6.5,
    gapAfter: 95,
    mdGapAfter: 89,
    mdClass: "md:w-23 md:h-[85%]",
  },
  {
    title: "Book Five",
    year: 2021,
    color: "#2E9EFF",
    rotate: 0,
    gapAfter: 72,
    mdGapAfter: 60,
    mdClass: "md:w-23 md:h-[93%]",
  },
  {
    title: "Book Six",
    year: 2021,
    color: "#2E9E",
    rotate: -5,
    gapAfter: 10,
    mdGapAfter: 12,
    mdClass: "md:w-23 md:h-[75%]",
  },
  {
    title: "Book Seven",
    year: 2021,
    color: "#23c5",
    rotate: 5,
    gapAfter: 0,
    mdGapAfter: 0,
    mdClass: "md:w-23 md:h-[85%]",
  },
];

export default function BookCarousel() {
  const [stickerOpacity, setStickerOpacity] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    carouselRef.current?.scrollTo({ left: 0 });
    setStickerOpacity(1);
  }, []);

  return (
    <>
      <IndexDragIndicator opacity={stickerOpacity} />

      <main className="relative flex h-[calc(100dvh-4rem)] min-h-0 w-full flex-col overflow-hidden overscroll-none bg-white">

        <p className="pointer-events-none absolute inset-x-0 top-1/3 z-0 select-none text-center font-serif italic text-6xl text-black/90 whitespace-nowrap ">
          Liliana Erasmus
        </p>

        <div
          ref={carouselRef}
          onScroll={(event) => {
            const scrollLeft = event.currentTarget.scrollLeft;

            if (scrollLeft <= 0) {
              setStickerOpacity(1);
              return;
            }

            setStickerOpacity(Math.max(0, 1 - scrollLeft / 180));
          }}
          className="relative z-10 flex min-h-0 w-full flex-1 items-end overflow-x-auto overflow-y-hidden snap-x snap-mandatory px-6 md:pl-80 lg:pl-[140vw] scrollbar-hide"
        >
          {books.map((book, i) => (
            <div
              key={i}
              className={`relative h-[90%] w-20 shrink-0 snap-center mr-[var(--mobile-gap)] md:mr-[var(--md-gap)] ${book.mdClass ?? ""}`}
              style={{
                "--mobile-gap": `${book.gapAfter}px`,
                "--md-gap": `${book.mdGapAfter ?? book.gapAfter}px`,
              } as React.CSSProperties}
            >
              <div
                className="flex h-full w-full justify-center outline shadow-lg"
                style={{
                  backgroundColor: book.color,
                  transform: `rotate(${book.rotate}deg)`,
                  transformOrigin: "bottom",
                }}
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