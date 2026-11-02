import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

// The password lives only in the Vercel settings (NEWS_ADMIN_PASSWORD),
// never in the code or the browser. After logging in, the browser keeps a
// signed cookie for 30 days. Changing the password logs everyone out.
const COOKIE_NAME = "news_admin";
const SESSION_DAYS = 30;

function getPassword() {
  return process.env.NEWS_ADMIN_PASSWORD ?? "";
}

function sign(value: string) {
  const key = createHash("sha256").update(`news-admin:${getPassword()}`).digest();
  return createHmac("sha256", key).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function isPasswordConfigured() {
  return getPassword().length > 0;
}

export function checkPassword(attempt: string) {
  return isPasswordConfigured() && safeEqual(attempt, getPassword());
}

export async function isLoggedIn() {
  if (!isPasswordConfigured()) return false;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;

  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}

export async function startSession() {
  const expires = String(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  (await cookies()).set(COOKIE_NAME, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE_NAME);
}