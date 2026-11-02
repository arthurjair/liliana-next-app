import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { isLoggedIn, isPasswordConfigured } from "./auth";
import { readAllPosts, type NewsPost } from "../news/store";
import LoginForm from "./loginform";
import NewsEditor from "./newseditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News editor · Liliana Erasmus",
  robots: { index: false, follow: false },
};

export default async function NewsAdminPage() {
  if (!isPasswordConfigured()) {
    return (
      <AdminShell>
        <p className="max-w-md text-lg text-stone-700">
          The editor isn&apos;t set up yet: add <code className="rounded bg-stone-100 px-1">NEWS_ADMIN_PASSWORD</code> in the
          Vercel settings (and in <code className="rounded bg-stone-100 px-1">.env.local</code> on your computer).
        </p>
      </AdminShell>
    );
  }

  if (!(await isLoggedIn())) {
    return (
      <AdminShell>
        <LoginForm />
      </AdminShell>
    );
  }

  let posts: NewsPost[] = [];
  let storageError = false;
  try {
    posts = await readAllPosts();
  } catch (error) {
    console.error(error);
    storageError = true;
  }

  return (
    <AdminShell>
      {storageError ? (
        <p className="max-w-md text-lg text-stone-700">
          Couldn&apos;t reach the photo &amp; post storage. Connect a Blob store to this project in Vercel (Storage → Create →
          Blob, access: Public) and try again.
        </p>
      ) : (
        <NewsEditor initialPosts={posts} />
      )}
    </AdminShell>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex-1 bg-stone-50 px-4 py-8 text-black sm:px-6 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm uppercase tracking-[0.2em] text-stone-500 underline underline-offset-4">
          ← Back to the website
        </Link>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}