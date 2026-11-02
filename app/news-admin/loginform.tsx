"use client";

import { useActionState } from "react";
import localFont from "next/font/local";
import { login, type LoginState } from "./actions";

const janeAust = localFont({
  src: "../fonts/JaneAust.ttf",
});

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(login, {});

  return (
    <div className="mx-auto mt-10 max-w-sm rounded-lg bg-white p-8 shadow-sm">
      <h1 className={`${janeAust.className} text-5xl`}>Hello Liliana</h1>
      <p className="mt-3 text-stone-600">Log in to write and edit your news.</p>

      <form action={formAction} className="mt-8 grid gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="border-b border-black bg-transparent px-0 py-3 outline-none transition-colors focus:border-[#2E9EFF]"
        />
        {state.error && <p className="mt-2 text-sm text-[#CE181B]">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-fit rounded-3xl bg-black px-8 py-3 text-sm text-white transition-colors hover:bg-[#2E9EFF] disabled:opacity-50"
        >
          {isPending ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}