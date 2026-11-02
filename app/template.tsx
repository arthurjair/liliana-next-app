import type { ReactNode } from "react";

// A template re-renders on every page change, so each page fades in softly.
// (Only opacity is animated: moving the page would shift "fixed" elements
// like the scroll circle on the homepage.)
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter flex flex-1 flex-col">{children}</div>;
}