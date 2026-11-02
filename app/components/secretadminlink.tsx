"use client";

import { useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";

const HOLD_MS = 3000;

// Holding this element for 3 seconds (mouse or finger) opens the news editor.
// It's only a shortcut: the editor still asks for the password,
// so nobody can post anything without it.
export default function SecretAdminLink({ children, className = "" }: { children: ReactNode; className?: string }) {
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const start = () => {
    cancel();
    timer.current = setTimeout(() => router.push("/news-admin"), HOLD_MS);
  };

  return (
    <span
      className={`select-none [-webkit-touch-callout:none] ${className}`}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onContextMenu={(event) => event.preventDefault()}
    >
      {children}
    </span>
  );
}