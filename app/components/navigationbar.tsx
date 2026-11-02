"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

const janeAust = localFont({
	src: "../fonts/JaneAust.ttf",
});

const menuItems = [
	{ label: "BOOKS", href: "/books" },
	{ label: "NEWS", href: "/news" },
	{ label: "ABOUT ME", href: "/about" },
	{ label: "CONTACT", href: "/contact" },
];

export default function NavigationBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const closeMenuOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("keydown", closeMenuOnEscape);
		document.body.style.overflow = isMenuOpen ? "hidden" : "";

		return () => {
			document.removeEventListener("keydown", closeMenuOnEscape);
			document.body.style.overflow = "";
		};
	}, [isMenuOpen]);

	// The news editor gets the whole screen, without the site menu.
	if (pathname?.startsWith("/news-admin")) return null;

	return (
		<nav className="relative z-[60] ">
			{/* navigation and open menu */}
			<div className="grid h-16 grid-cols-3 items-center px-4 sm:px-6 lg:px-10  bg-white">
				<button
				type="button"
				 className="flex h-11 w-11 items-center justify-start rounded-md text-black text-2xl leading-none transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 md:hidden"
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				aria-expanded={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
				<span className="relative block h-6 w-6" aria-hidden="true">
					<span className={`absolute left-0 top-[3px] block h-0.5 w-6 origin-center rounded-full bg-current transition-transform duration-300 ease-out ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
					<span className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ease-out ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
					<span className={`absolute left-0 top-[20px] block h-0.5 w-6 origin-center rounded-full bg-current transition-transform duration-300 ease-out ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
				</span>
				</button>

			<Link
				className={`${janeAust.className} justify-self-center whitespace-nowrap text-black text-2xl font-semibold md:col-start-1 md:text-3xl sm:justify-self-start`}
				href="/"
			>
				Liliana Erasmus
			</Link>

			<div className="col-start-3 hidden items-center justify-end gap-8 md:flex" role="menubar">
				{menuItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="whitespace-nowrap text-lg text-black  font-medium transition-colors hover:text-zinc-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
						role="menuitem"
					>
						{item.label}
					</Link>
				))}
			</div>

			</div>

			<div
				className={`fixed inset-0 top-16 bg-zinc-900/20 transition-opacity duration-300 sm:hidden ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
				aria-hidden="true"
				onClick={() => setIsMenuOpen(false)}
			/>

			<div
				className={`fixed bottom-0 left-0 top-16 w-full border-r border-zinc-200 bg-white px-5 py-6 shadow-xl transition-transform duration-300 ease-out sm:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
				aria-hidden={!isMenuOpen}
			>
				<div className="flex flex-col items-center py-12" role="menu">
					{menuItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="  border-zinc-100 text-black py-5 text-5xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
							onClick={() => setIsMenuOpen(false)}
							role="menuitem"
						>
							{item.label}
						</Link>
					))}
					<img
						src="/nav-gif.gif"
						alt=""
						aria-hidden="true"
						className="h-auto t w-50 object-contain"
					/>
				</div>
			</div>
		</nav>
	);
}