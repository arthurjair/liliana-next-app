import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/footer";
import { formatPostDate, getPost } from "../posts";

export const revalidate = 3600;

type NewsPostPageProps = {
  params: Promise<{ slug: string }>;
};

// Turns web addresses in her text into links, and single line breaks into <br>.
function TextWithLinks({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (/^https?:\/\//.test(part)) {
          const url = part.replace(/[.,;:!?)]+$/, ""); // don't swallow a full stop after a link
          const trailing = part.slice(url.length);
          return (
            <Fragment key={i}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="break-words font-medium text-black underline decoration-[#2E9EFF] decoration-2 underline-offset-4 hover:text-[#2E9EFF]"
              >
                {url.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
              {trailing}
            </Fragment>
          );
        }
        return part.split("\n").map((line, j, lines) => (
          <Fragment key={`${i}-${j}`}>
            {line}
            {j < lines.length - 1 && <br />}
          </Fragment>
        ));
      })}
    </>
  );
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const [cover, ...gallery] = post.images;
  const paragraphs = post.body.split(/\n\s*\n/).filter((p) => p.trim());

  return (
    <>
      <main className="flex-1 bg-white px-4 py-8 text-black sm:px-6 lg:px-12">
        <Link href="/news" className="text-sm uppercase tracking-[0.2em] text-stone-500 underline underline-offset-4">
          Back to all news
        </Link>

        <article className="mx-auto mt-10 max-w-3xl">
          <time dateTime={post.date} className="text-sm uppercase tracking-[0.2em] text-stone-500">
            {formatPostDate(post.date)}
          </time>
          <h1 className="mt-3 text-4xl font-medium leading-tight sm:text-6xl">{post.title}</h1>

          {cover && (
            <div className="mt-10 overflow-hidden rounded-sm bg-stone-100">
              <img src={cover} alt="" className="h-auto w-full object-cover" />
            </div>
          )}

          {paragraphs.length > 0 && (
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-stone-700">
              {paragraphs.map((paragraph, i) => (
                <p key={i}>
                  <TextWithLinks text={paragraph.trim()} />
                </p>
              ))}
            </div>
          )}

          {gallery.length > 0 && (
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {gallery.map((url) => (
                <img key={url} src={url} alt="" loading="lazy" className="h-auto w-full rounded-sm object-cover" />
              ))}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}