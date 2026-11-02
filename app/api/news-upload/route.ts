import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isLoggedIn } from "../../news-admin/auth";

// The editor sends one (already shrunk) photo here; we check the login and
// save it to Vercel Blob. On Vercel, storage access is automatic (BLOB_STORE_ID),
// so no secret token is needed in the code.
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 4 * 1024 * 1024; // Vercel accepts up to 4.5 MB per request

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

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "You're logged out. Please log in again." }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No photo was received." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, WebP or GIF photos can be used." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "This photo is too big (max 4 MB). Try a smaller one." }, { status: 400 });
    }

    const blob = await put(`news/images/${safeFileName(file.name)}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
      cacheControlMaxAge: 30 * 24 * 60 * 60, // photos never change, cache for a month
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("News photo upload failed:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}