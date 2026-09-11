"use client";

const books = [
  { title: "Zap Zap Zzziennng!", year: 2025, color: "#EAC342", rotate: 8.5, gapAfter: 122,},
  { title: "Aza and the Magic Doors", year: 2024, color: "#2E9EFF", gapAfter: 87, },
  { title: "Book Three", year: 2023, color: "#A4C639",rotate: -6, gapAfter: 16 },
  { title: "Book Four", year: 2022, color: "#EAC342", rotate: 6.5, gapAfter: 94 },
  { title: "Book Five", year: 2021, color: "#2E9EFF", rotate: 0, gapAfter: 0 },
];

export default function BookCarousel() {
  return (
    <main className="relative flex h-[calc(100dvh-4rem)] min-h-0 w-full flex-col overflow-hidden overscroll-none bg-white">
      
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
    </main>
  );
}