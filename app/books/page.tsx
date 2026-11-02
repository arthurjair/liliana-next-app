import Footer from "../components/footer";
import Link from "next/link";
import { books } from "./books";

export default function BooksPage() {
  return (
    <>
      <main className="flex-1 bg-white px-4 py-10 text-black sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-sm uppercase tracking-[0.2em] text-stone-500">All Books</h1>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {books.map((book) => (
              <Link href={`/books/${book.slug}`} key={book.slug} className="block">
                <div className="group relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-stone-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-[75%] w-[70%] object-contain transition duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-start justify-center overflow-x-hidden overflow-y-auto bg-[#F6EF7A] p-5 opacity-0 transition duration-300 group-hover:opacity-100 sm:px-6">
                    <div className="min-w-0 max-w-full break-words text-black">
                      <h3 className="text-2xl font-semibold uppercase lg:text-3xl">{book.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed sm:mt-2 sm:text-sm lg:text-base">{book.blurb}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}