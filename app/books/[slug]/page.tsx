import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/footer";
import { books } from "../books";

type BookPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = books.find((book) => book.slug === slug);

  if (!book) {
    notFound();
  }

  return (
    <>
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-12">
        <Link href="/books" className="text-sm underline underline-offset-4 text-sm uppercase tracking-[0.2em] text-stone-500">
          Back to all books
        </Link>

        <article className="mx-auto mt-8 grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex min-h-[28rem] items-center justify-center rounded-sm bg-stone-100 p-8 sm:min-h-[36rem]">
            <img
              src={book.image}
              alt={book.title}
              className="h-full max-h-[32rem] w-full max-w-sm object-contain"
            />
          </div>

          <div className="max-w-xl">
            
            <h1 className="text-4xl font-medium leading-tight sm:text-6xl lg:text-7xl lg:font-medium">
              {book.title}
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-stone-700">
              {book.blurb}
            </p>
            {book.buyUrl && (
              <a
                href={book.buyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block bg-black px-6 py-3 rounded-3xl flex  bg-black px-8 py-3 text-sm text-white transition-opacity hover:opacity-70"
              >
                Buy Here
              </a>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
