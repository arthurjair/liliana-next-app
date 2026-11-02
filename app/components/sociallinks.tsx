import type { CSSProperties } from "react";

type SocialLinksProps = {
  // "always": icons are colorful all the time (About page)
  // "hover": icons are black and turn colorful on hover (Contact page)
  colorMode?: "always" | "hover";
  className?: string;
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-full w-full">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-full w-full">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Colors come from the book spines on the homepage.
const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/globetrauthor/",
    color: "#E789B6",
    Icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lilianaerasmus/",
    color: "#2E9EFF",
    Icon: LinkedInIcon,
  },
];

export default function SocialLinks({ colorMode = "hover", className = "" }: SocialLinksProps) {
  const colorClasses =
    colorMode === "always"
      ? "text-[var(--brand)]"
      : "text-black hover:text-[var(--brand)] focus-visible:text-[var(--brand)]";

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socials.map(({ label, href, color, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noreferrer"
          style={{ "--brand": color } as CSSProperties}
          className={`block h-9 w-9 transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${colorClasses}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}