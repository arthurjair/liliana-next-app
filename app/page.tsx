"use client";

const books = [
  { title: "Zap Zap Zzziennng!", year: 2025, color: "#EAC342", rotate: 12, gapAfter: 117,},
  { title: "Aza and the Magic Doors", year: 2024, color: "#2E9EFF", gapAfter: 60, },
  { title: "Book Three", year: 2023, color: "#A4C639",rotate: -6, gapAfter: 16 },
  { title: "Book Four", year: 2022, color: "#EAC342", rotate: 6.5, gapAfter: 65 },
  { title: "Book Five", year: 2021, color: "#2E9EFF", rotate: 0, gapAfter: 50 },
  { title: "Book Six", year: 2021, color: "#2E9E", rotate: -5, gapAfter: 10 },
  { title: "Book Seven", year: 2021, color: "#23c5", rotate: 0, gapAfter: 0 },
];

import IndexDragIndicator from "./components/indexdragindicator";

export default function BookCarousel() {
  return (
    <><IndexDragIndicator /><main className="relative flex h-[calc(100dvh-4rem)] min-h-0 w-full flex-col overflow-hidden overscroll-none bg-white">

      <p className="pointer-events-none absolute inset-x-0 top-1/3 z-0 select-none text-center font-serif italic text-6xl text-black/90 whitespace-nowrap">
        Liliana Erasmus
      </p>

      <div
        className="relative z-10 flex flex-1 min-h-0 items-end w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory px-6 scrollbar-hide"
      >
        {books.map((book, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-20 h-[90%] snap-center outline shadow-lg flex justify-center"
            style={{
              backgroundColor: book.color,
              transform: `rotate(${book.rotate}deg)`,
              transformOrigin: "bottom",
              marginRight: `${book.gapAfter}px`,
            }}
          >
            <p
              className="whitespace-nowrap text-lg font-semibold text-black p-5"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {book.title} <span className="text-sm font-normal">{book.year}</span>
            </p>
          </div>
        ))}
      </div>
    </main></>
  );
}