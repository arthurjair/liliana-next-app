"use client";

import { useRef, useState, useTransition } from "react";
import { upload } from "@vercel/blob/client";
import { deletePost, discardImages, logout, savePost, type PostInput } from "./actions";
import type { NewsPost } from "../news/store";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_SIZE = 2000; // px, longest side

type FormState = Omit<PostInput, "id"> & { id?: string };

function today() {
  return new Date().toLocaleDateString("sv-SE"); // YYYY-MM-DD in local time
}

function emptyForm(): FormState {
  return { title: "", date: today(), excerpt: "", body: "", images: [], published: true };
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// Big phone photos are scaled down in the browser before uploading:
// faster for her, and much faster pages for visitors.
async function shrinkImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 1.5 * 1024 * 1024 && ALLOWED_TYPES.includes(file.type)) return file;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file; // browser couldn't read it; the type check below will catch odd formats
  }
}

function safeFileName(name: string) {
  return (
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/^-+|-+$/g, "") || "photo.jpg"
  );
}

export default function NewsEditor({ initialPosts }: { initialPosts: NewsPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [form, setForm] = useState<FormState | null>(null); // null = showing the list
  const [uploading, setUploading] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);
  // photos uploaded while editing that aren't saved in a post yet
  const newUploads = useRef<Set<string>>(new Set());

  const update = (changes: Partial<FormState>) => setForm((current) => (current ? { ...current, ...changes } : current));

  const openNew = () => {
    setMessage(null);
    newUploads.current.clear();
    setForm(emptyForm());
  };

  const openExisting = (post: NewsPost) => {
    setMessage(null);
    newUploads.current.clear();
    setForm({
      id: post.id,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      body: post.body,
      images: [...post.images],
      published: post.published,
    });
  };

  const closeEditor = () => {
    const unsaved = [...newUploads.current];
    newUploads.current.clear();
    if (unsaved.length > 0) discardImages(unsaved).catch(() => {});
    setForm(null);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setMessage(null);

    await Promise.all(
      Array.from(files).map(async (file) => {
        const key = `${file.name}-${crypto.randomUUID()}`;
        setUploading((list) => [...list, key]);
        try {
          const prepared = await shrinkImage(file);
          if (!ALLOWED_TYPES.includes(prepared.type)) {
            throw new Error(`"${file.name}" isn't a JPG, PNG or WebP photo.`);
          }
          const blob = await upload(`news/images/${safeFileName(prepared.name)}`, prepared, {
            access: "public",
            handleUploadUrl: "/api/news-upload",
          });
          newUploads.current.add(blob.url);
          setForm((current) => (current ? { ...current, images: [...current.images, blob.url] } : current));
        } catch (error) {
          const text = error instanceof Error && error.message.startsWith('"') ? error.message : `Uploading "${file.name}" didn't work. Try again?`;
          setMessage({ type: "error", text });
        } finally {
          setUploading((list) => list.filter((k) => k !== key));
        }
      }),
    );

    if (fileInput.current) fileInput.current.value = "";
  };

  const removeImage = (url: string) => {
    update({ images: form?.images.filter((u) => u !== url) ?? [] });
    // a photo that was only just uploaded can be thrown away right away;
    // photos already in a saved post are removed from storage when she saves
    if (newUploads.current.has(url)) {
      newUploads.current.delete(url);
      discardImages([url]).catch(() => {});
    }
  };

  const makeCover = (url: string) => {
    if (!form) return;
    update({ images: [url, ...form.images.filter((u) => u !== url)] });
  };

  const save = (published: boolean) => {
    if (!form) return;
    setMessage(null);
    startTransition(async () => {
      const result = await savePost({ ...form, published });
      if ("error" in result) {
        setMessage({ type: "error", text: result.error });
        return;
      }
      newUploads.current.clear();
      setPosts(result.posts);
      setForm(null);
      setMessage({ type: "success", text: published ? "Published! It's on the News page now." : "Saved as a draft." });
    });
  };

  const remove = (post: NewsPost) => {
    if (!window.confirm(`Delete "${post.title}"? This can't be undone.`)) return;
    setMessage(null);
    startTransition(async () => {
      const result = await deletePost(post.id);
      if ("error" in result) {
        setMessage({ type: "error", text: result.error });
        return;
      }
      setPosts(result.posts);
      setMessage({ type: "success", text: "Post deleted." });
    });
  };

  const notice = message && (
    <p
      role="status"
      className={`mb-6 rounded-lg px-4 py-3 text-sm ${
        message.type === "error" ? "bg-[#CE181B]/10 text-[#CE181B]" : "bg-[#A4C639]/20 text-black"
      }`}
    >
      {message.text}
    </p>
  );

  /* ---------- Editing a post ---------- */
  if (form) {
    const isUploading = uploading.length > 0;
    const existing = form.id ? posts.find((p) => p.id === form.id) : undefined;

    return (
      <div className="rounded-lg bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-sm uppercase tracking-[0.2em] text-stone-500">{form.id ? "Edit post" : "New post"}</h1>
          <button type="button" onClick={closeEditor} className="text-sm underline underline-offset-4 hover:text-[#2E9EFF]">
            Cancel
          </button>
        </div>

        {notice}

        <div className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <input
              id="title"
              value={form.title}
              onChange={(e) => update({ title: e.target.value })}
              className="border-b border-black bg-transparent px-0 py-3 text-2xl outline-none transition-colors focus:border-[#2E9EFF]"
              placeholder="What's the news?"
            />
          </div>

          <div className="grid gap-2 sm:max-w-xs">
            <label htmlFor="date" className="text-sm font-medium">Date</label>
            <input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => update({ date: e.target.value })}
              className="border-b border-black bg-transparent px-0 py-3 outline-none transition-colors focus:border-[#2E9EFF]"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="excerpt" className="text-sm font-medium">Short intro</label>
            <p className="text-sm text-stone-500">One or two sentences, shown on the News overview.</p>
            <textarea
              id="excerpt"
              rows={2}
              value={form.excerpt}
              onChange={(e) => update({ excerpt: e.target.value })}
              className="resize-y border-b border-black bg-transparent px-0 py-3 outline-none transition-colors focus:border-[#2E9EFF]"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="body" className="text-sm font-medium">Text</label>
            <p className="text-sm text-stone-500">Leave an empty line between paragraphs. Web addresses become clickable links.</p>
            <textarea
              id="body"
              rows={12}
              value={form.body}
              onChange={(e) => update({ body: e.target.value })}
              className="resize-y rounded-sm border border-stone-300 bg-transparent p-4 leading-relaxed outline-none transition-colors focus:border-[#2E9EFF]"
            />
          </div>

          <div className="grid gap-3">
            <span className="text-sm font-medium">Photos</span>
            <p className="text-sm text-stone-500">The first photo is the cover. Other photos appear below the text.</p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {form.images.map((url, i) => (
                <div key={url} className="group relative aspect-square overflow-hidden rounded-sm bg-stone-100">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  {i === 0 && (
                    <span className="absolute left-2 top-2 rounded-full bg-[#EAC342] px-2 py-0.5 text-xs font-medium">Cover</span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-black/60 p-2 text-xs text-white">
                    {i !== 0 ? (
                      <button type="button" onClick={() => makeCover(url)} className="hover:underline">
                        Make cover
                      </button>
                    ) : (
                      <span />
                    )}
                    <button type="button" onClick={() => removeImage(url)} className="hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {uploading.map((key) => (
                <div key={key} className="flex aspect-square animate-pulse items-center justify-center rounded-sm bg-stone-100 text-xs text-stone-500">
                  Uploading…
                </div>
              ))}

              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border-2 border-dashed border-stone-300 text-sm text-stone-500 transition-colors hover:border-[#2E9EFF] hover:text-[#2E9EFF]">
                <span className="text-3xl leading-none">+</span>
                Add photos
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-stone-200 pt-6">
            <button
              type="button"
              onClick={() => save(true)}
              disabled={isPending || isUploading}
              className="rounded-3xl bg-black px-8 py-3 text-sm text-white transition-colors hover:bg-[#2E9EFF] disabled:opacity-50"
            >
              {isPending ? "Saving…" : existing?.published ? "Save changes" : "Publish"}
            </button>
            <button
              type="button"
              onClick={() => save(false)}
              disabled={isPending || isUploading}
              className="rounded-3xl border border-black px-8 py-3 text-sm transition-colors hover:border-[#2E9EFF] hover:text-[#2E9EFF] disabled:opacity-50"
            >
              {existing?.published ? "Unpublish (make draft)" : "Save as draft"}
            </button>
            {isUploading && <span className="text-sm text-stone-500">Waiting for photos to finish…</span>}
          </div>
        </div>
      </div>
    );
  }

  /* ---------- List of posts ---------- */
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-medium">Your news</h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openNew}
            className="rounded-3xl bg-black px-6 py-3 text-sm text-white transition-colors hover:bg-[#FE7C02]"
          >
            + New post
          </button>
          <form action={logout}>
            <button type="submit" className="text-sm underline underline-offset-4 hover:text-[#2E9EFF]">
              Log out
            </button>
          </form>
        </div>
      </div>

      {notice}

      {posts.length === 0 ? (
        <p className="rounded-lg bg-white p-8 text-stone-600 shadow-sm">No posts yet. Click “New post” to write the first one.</p>
      ) : (
        <ul className="divide-y divide-stone-200 rounded-lg bg-white shadow-sm">
          {posts.map((post) => (
            <li key={post.id} className="flex items-center gap-4 p-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-stone-100">
                {post.images[0] && <img src={post.images[0]} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-medium">{post.title}</p>
                <p className="text-sm text-stone-500">
                  {formatDate(post.date)} ·{" "}
                  {post.published ? <span className="text-[#2E9EFF]">Published</span> : <span>Draft</span>}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm">
                {post.published && (
                  <a href={`/news/${post.slug}`} target="_blank" rel="noreferrer" className="hidden underline underline-offset-4 hover:text-[#2E9EFF] sm:inline">
                    View
                  </a>
                )}
                <button type="button" onClick={() => openExisting(post)} className="underline underline-offset-4 hover:text-[#2E9EFF]">
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(post)}
                  disabled={isPending}
                  className="underline underline-offset-4 hover:text-[#CE181B] disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}