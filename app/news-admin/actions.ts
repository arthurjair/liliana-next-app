"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { checkPassword, endSession, isLoggedIn, startSession } from "./auth";
import { deleteImages, readAllPosts, slugify, uniqueSlug, writeAllPosts, type NewsPost } from "../news/store";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    // small pause makes guessing passwords slow
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { error: "That password isn't right. Try again?" };
  }

  await startSession();
  revalidatePath("/news-admin");
  return {};
}

export async function logout() {
  await endSession();
  revalidatePath("/news-admin");
}

export type PostInput = {
  id?: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  images: string[];
  published: boolean;
};

export type SaveResult = { ok: true; posts: NewsPost[] } | { ok: false; error: string };

function refreshPublicPages(slug?: string) {
  revalidatePath("/news");
  if (slug) revalidatePath(`/news/${slug}`);
}

export async function savePost(input: PostInput): Promise<SaveResult> {
  if (!(await isLoggedIn())) return { ok: false, error: "You're logged out. Please log in again." };

  const title = input.title.trim();
  if (!title) return { ok: false, error: "Please give the post a title." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return { ok: false, error: "Please pick a date." };

  try {
    const posts = await readAllPosts();
    const existing = input.id ? posts.find((post) => post.id === input.id) : undefined;
    const images = input.images.filter((url) => typeof url === "string" && url.startsWith("https://"));

    const post: NewsPost = {
      id: existing?.id ?? randomUUID(),
      // keep the web address stable once a post exists, so shared links keep working
      slug: existing?.slug ?? uniqueSlug(slugify(title), posts),
      title,
      date: input.date,
      excerpt: input.excerpt.trim(),
      body: input.body.trim(),
      images,
      published: input.published,
      updatedAt: new Date().toISOString(),
    };

    const next = existing ? posts.map((p) => (p.id === post.id ? post : p)) : [post, ...posts];
    await writeAllPosts(next);

    // photos removed from the post are deleted from storage too
    if (existing) {
      const removed = existing.images.filter((url) => !images.includes(url));
      await deleteImages(removed).catch(() => {});
    }

    refreshPublicPages(post.slug);
    return { ok: true, posts: await readAllPosts().catch(() => next) };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Saving didn't work. Check your internet connection and try again." };
  }
}

export async function deletePost(id: string): Promise<SaveResult> {
  if (!(await isLoggedIn())) return { ok: false, error: "You're logged out. Please log in again." };

  try {
    const posts = await readAllPosts();
    const post = posts.find((p) => p.id === id);
    if (!post) return { ok: true, posts };

    const next = posts.filter((p) => p.id !== id);
    await writeAllPosts(next);
    await deleteImages(post.images).catch(() => {});

    refreshPublicPages(post.slug);
    return { ok: true, posts: next };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Deleting didn't work. Please try again." };
  }
}

// Throws away photos that were uploaded but never saved in a post
// (for example when she presses Cancel). Photos used in any post are never touched.
export async function discardImages(urls: string[]): Promise<void> {
  if (!(await isLoggedIn())) return;

  try {
    const posts = await readAllPosts();
    const inUse = new Set(posts.flatMap((post) => post.images));
    const removable = urls.filter(
      (url) => typeof url === "string" && url.includes(".blob.vercel-storage.com/news/images/") && !inUse.has(url),
    );
    await deleteImages(removable);
  } catch (error) {
    console.error(error);
  }
}