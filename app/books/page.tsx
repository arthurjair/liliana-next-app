import Link from "next/link";
import { Oswald } from "next/font/google";
import Footer from "../components/footer";
import Reveal from "../components/reveal";
import { books } from "./books";

// Condensed bold font for the hover titles (like the rep.club cards)
const oswald = Oswald({
  weight: ["600", "700"],
  subsets: ["latin"],
});

// The year it was first published = the first year mentioned in the blurb
function firstYear(text: string) {
  return text.match(/\b(19|20)\d{2}\b/)?.[0];
}

export default function BooksPage() {
  return (
    <>
      <main className="flex-1 bg-white px-4 py-10 text-black sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-sm uppercase tracking-[0.2em] text-stone-500">All Books</h1>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {books.map((book, i) => {
              const year = firstYear(book.blurb);

              return (
                <Reveal key={book.slug} delay={(i % 4) * 80}>
                  <Link href={`/books/${book.slug}`} className="group block">
                    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-stone-100">
                      <img
                        src={book.image}
                        alt={book.title}
                        loading="lazy"
                        className="h-[75%] w-[70%] object-contain drop-shadow-md transition duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Hover card: big title top-left, intro text, year, then "View book".
                          Long descriptions scroll inside the card instead of being cut off.
                          Only on devices with a mouse: on phones there is no hover, and an
                          invisible scrollable card would block swiping through the page. */}
                      <div className="absolute inset-0 hidden flex-col overflow-y-auto bg-[#F6EF7A] p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-5 lg:p-6 [@media(hover:hover)]:flex">
                        <div className="pb-1 translate-y-3 transition-[translate] duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0">
                          <h3 className={`${oswald.className} text-2xl font-bold uppercase leading-[0.95] tracking-tight sm:text-3xl lg:text-4xl`}>
                            {book.title}
                          </h3>
                          <p className="mt-3 text-sm leading-snug lg:text-base">{book.blurb}</p>
                          {year && <p className={`${oswald.className} mt-4 text-lg font-semibold`}>{year}</p>}
                          <span className="mt-1 inline-flex items-center gap-1 font-serif text-base underline-offset-4 group-hover:underline">
                            View book <span aria-hidden="true" className="transition-[translate] duration-300 group-hover:translate-x-1">→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}