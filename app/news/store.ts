import { del, list, put } from "@vercel/blob";

// All news posts live in one small JSON file in Vercel Blob storage.
// Photos are stored next to it, in the "news/images/" folder.
const POSTS_FILE = "news/posts.json";

export type NewsPost = {
  id: string;
  slug: string; // web address: /news/<slug>
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string; // short intro for the News overview
  body: string; // plain text, empty line = new paragraph
  images: string[]; // photo URLs; the first one is the cover
  published: boolean; // false = draft, only visible in the editor
  updatedAt: string;
};

// Reads every post (drafts included). Throws if storage isn't connected.
export async function readAllPosts(): Promise<NewsPost[]> {
  const { blobs } = await list({ prefix: POSTS_FILE, limit: 1 });
  const file = blobs.find((blob) => blob.pathname === POSTS_FILE);
  if (!file) return []; // nothing written yet

  // ?v=… makes sure we never get an old cached copy after an edit
  const response = await fetch(`${file.url}?v=${new Date(file.uploadedAt).getTime()}`);
  if (!response.ok) throw new Error(`Could not read posts (${response.status})`);
  const posts = (await response.json()) as NewsPost[];
  return sortPosts(posts);
}

export async function writeAllPosts(posts: NewsPost[]) {
  await put(POSTS_FILE, JSON.stringify(sortPosts(posts), null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

export async function deleteImages(urls: string[]) {
  if (urls.length > 0) await del(urls);
}

export function sortPosts(posts: NewsPost[]) {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date) || b.updatedAt.localeCompare(a.updatedAt));
}

// "Bezoek aan de Bibliotheek!" -> "bezoek-aan-de-bibliotheek"
export function slugify(text: string) {
  return (
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "post"
  );
}

export function uniqueSlug(base: string, posts: NewsPost[], ownId?: string) {
  const taken = new Set(posts.filter((post) => post.id !== ownId).map((post) => post.slug));
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  return slug;
}