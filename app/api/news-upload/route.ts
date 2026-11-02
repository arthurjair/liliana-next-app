import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isLoggedIn } from "../../news-admin/auth";

// Photos go straight from the browser to Vercel Blob (so big phone photos work).
// This route only hands out an upload permission, and only to a logged-in editor.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isLoggedIn())) {
          throw new Error("Not logged in");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
          maximumSizeInBytes: 20 * 1024 * 1024, // 20 MB
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // nothing to do: the photo URL is saved together with the post
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}