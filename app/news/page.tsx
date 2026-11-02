import type { CSSProperties } from "react";
import Link from "next/link";
import Footer from "../components/footer";
import Reveal from "../components/reveal";
import { accentColors, formatPostDate, getPosts } from "./posts";

// The page is refreshed right away whenever Liliana saves a post;
// this is just a safety net.
export const revalidate = 3600;

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <>
      <main className="flex-1 bg-white px-4 py-10 text-black sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-sm uppercase tracking-[0.2em] text-stone-500">News</h1>

          {posts.length === 0 ? (
            <p className="mt-6 text-lg text-stone-600">New stories coming soon.</p>
          ) : (
            <ul className="mt-6 border-t border-stone-200">
              {posts.map((post, i) => (
                <li key={post.id} className="border-b border-stone-200">
                  <Reveal>
                  <Link
                    href={`/news/${post.slug}`}
                    style={{ "--accent": accentColors[i % accentColors.length] } as CSSProperties}
                    className="group grid items-start gap-4 py-8 md:grid-cols-[10rem_1fr_16rem] md:gap-10"
                  >
                    <time dateTime={post.date} className="text-sm uppercase tracking-[0.2em] text-stone-500">
                      {formatPostDate(post.date)}
                    </time>

                    <div>
                      <h2 className="text-3xl font-medium leading-tight decoration-[var(--accent)] decoration-4 underline-offset-8 group-hover:underline md:text-4xl">
                        {post.title}
                      </h2>
                      {post.excerpt && <p className="mt-3 max-w-2xl leading-relaxed text-stone-700">{post.excerpt}</p>}
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-[var(--accent)]">
                        Read more <span aria-hidden="true">→</span>
                      </span>
                    </div>

                    {post.images[0] && (
                      <div className="aspect-[4/3] overflow-hidden rounded-sm bg-stone-100">
                        <img
                          src={post.images[0]}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}