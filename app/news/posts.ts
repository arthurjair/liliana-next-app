import { readAllPosts, type NewsPost } from "./store";

// Public side of the News: only published posts, and never an error page
// if storage is unreachable (the page then just says "coming soon").

export async function getPosts(): Promise<NewsPost[]> {
  try {
    return (await readAllPosts()).filter((post) => post.published);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPost(slug: string): Promise<NewsPost | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function formatPostDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Accent colors from the book spines on the homepage.
export const accentColors = ["#2E9EFF", "#E789B6", "#FE7C02", "#A4C639", "#EAC342", "#56C3EE", "#CE181B"];