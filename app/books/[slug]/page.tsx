import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/footer";
import { artistLinks, books } from "../books";

type BookPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Turns illustrator names in the blurb into links (first mention of each name only).
function BlurbWithArtistLinks({ text }: { text: string }) {
  const normalized = text.normalize("NFC");
  const artists = artistLinks.map((artist) => ({ ...artist, name: artist.name.normalize("NFC") }));
  const pattern = new RegExp(`(${artists.map((artist) => escapeRegExp(artist.name)).join("|")})`, "g");
  const linked = new Set<string>();

  return (
    <>
      {normalized.split(pattern).map((part, i) => {
        const artist = artists.find((a) => a.name === part);
        if (artist && !linked.has(artist.name)) {
          linked.add(artist.name);
          return (
            <a
              key={i}
              href={artist.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-black underline decoration-[#2E9EFF] decoration-2 underline-offset-4 transition-colors hover:text-[#2E9EFF]"
            >
              {part}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = books.find((book) => book.slug === slug);

  if (!book) {
    notFound();
  }

  return (
    <>
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-12 bg-white">
        <Link href="/books" className="text-sm uppercase tracking-[0.2em] text-stone-500 underline underline-offset-4">
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
            <h1 className="text-4xl font-medium leading-tight text-black sm:text-6xl lg:text-7xl">
              {book.title}
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-stone-700">
              <BlurbWithArtistLinks text={book.blurb} />
            </p>
            {book.buyUrl && (
              <a
                href={book.buyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-3xl bg-black px-8 py-3 text-sm text-white transition-colors hover:bg-[#2E9EFF]"
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