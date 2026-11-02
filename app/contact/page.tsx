import Link from "next/link";
import localFont from "next/font/local";
import Footer from "../components/footer";
import SocialLinks from "../components/sociallinks";

const janeAust = localFont({
	src: "../fonts/JaneAust.ttf",
});

// A little shelf of her newest books, in the same colors as the homepage spines.
// Each spine links to the book; the last one leans and stands up straight on hover.
const spines = [
	{ slug: "Zap-Zap-ZZZIENNG", title: "Zap Zap Zzzienng!", color: "#EAC342", height: "h-28" },
	{ slug: "Aza-and-the-magic-doors", title: "Aza and the Magic Doors", color: "#2E9EFF", height: "h-32" },
	{ slug: "the-murf", title: "The Murf", color: "#A4C639", height: "h-24" },
	{ slug: "Schelpeneiland", title: "Ora Ubao, Shell Island", color: "#56C3EE", height: "h-30" },
	{ slug: "Friends-Everywhere", title: "Friends Everywhere", color: "#E789B6", height: "h-26" },
	{ slug: "What-Does-Kiwi-Want-Now", title: "What Does Kiwi Want Now?", color: "#FE7C02", height: "h-30", lean: true },
];

const fieldClass =
	"border-b border-black bg-transparent px-0 py-3 outline-none transition-colors placeholder:text-stone-400 focus:border-[#2E9EFF]";

export default function ContactPage() {
	return (
		<>
			<main className="flex-1 bg-white px-4 py-10 text-black sm:px-6 lg:px-12">
				<div className="mx-auto max-w-6xl">
					<p className="text-sm uppercase tracking-[0.2em] text-stone-500">Contact</p>

					<div className="mt-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
						{/* Left column: greeting, socials and the spine shelf */}
						<div className="flex flex-col">
							<h1 className={`${janeAust.className} text-6xl leading-tight lg:text-8xl`}>
								Let&apos;s talk!
							</h1>
							<p className="mt-6 max-w-sm text-lg leading-relaxed text-stone-700">
								Questions about one of my books, an illustration project or a collaboration? Leave a message and I&apos;ll get back to you.
							</p>

							<div className="mt-10">
								<p className="text-sm uppercase tracking-[0.2em] text-stone-500">Socials</p>
								<SocialLinks colorMode="hover" className="mt-4" />
							</div>

							{/* pt-16 always keeps room above the shelf (for the hover labels); mt-auto pushes it to the bottom */}
							<nav aria-label="Recent books" className="mt-auto hidden pt-16 lg:block">
								<div className="flex items-end gap-1.5 border-b-2 border-black">
									{spines.map((spine) => (
										<Link
											key={spine.slug}
											href={`/books/${spine.slug}`}
											aria-label={spine.title}
											className={`group relative ${spine.height} w-8 shadow-md transition-[translate,rotate] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${
												spine.lean
													? "ml-3 origin-bottom-right rotate-[10deg] hover:rotate-0 focus-visible:rotate-0"
													: "hover:-translate-y-2 focus-visible:-translate-y-2"
											}`}
											style={{ backgroundColor: spine.color }}
										>
											<span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-3 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
												{spine.title}
											</span>
										</Link>
									))}
								</div>
								<p className="mt-3 text-xs uppercase tracking-[0.2em] text-stone-500">Pick a book from the shelf</p>
							</nav>
						</div>

						<form action="https://formspree.io/f/mdekeegy" method="post">
							<div className="grid gap-6 sm:grid-cols-2">
								<div className="grid gap-2">
									<label htmlFor="first-name" className="text-sm font-medium">First name</label>
									<input id="first-name" name="firstName" type="text" autoComplete="given-name" required className={fieldClass} placeholder="Your first name" />
								</div>
								<div className="grid gap-2">
									<label htmlFor="last-name" className="text-sm font-medium">Last name</label>
									<input id="last-name" name="lastName" type="text" autoComplete="family-name" required className={fieldClass} placeholder="Your last name" />
								</div>
							</div>

							<div className="mt-4 grid gap-2">
								<label htmlFor="email" className="text-sm font-medium">Email</label>
								<input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} placeholder="you@example.com" />
							</div>

							<div className="mt-4 grid gap-2">
								<label htmlFor="reason" className="text-sm font-medium">I&apos;m here for...</label>
								<select id="reason" name="reason" required defaultValue="" className={fieldClass}>
									<option value="" disabled>Select an option</option>
									<option value="book">A book inquiry</option>
									<option value="illustration">An illustration project</option>
									<option value="collaboration">A collaboration</option>
									<option value="other">Something else</option>
								</select>
							</div>

							<div className="mt-4 grid gap-2">
								<label htmlFor="message" className="text-sm font-medium">What should I know?</label>
								<textarea id="message" name="message" rows={5} required className={`${fieldClass} resize-y`} placeholder="Tell me a little about your project or question..." />
							</div>

							<button
								type="submit"
								className="group mt-6 flex w-fit items-center gap-2 rounded-3xl bg-black px-8 py-3 text-sm text-white transition-[background-color,scale] duration-200 hover:bg-[#FE7C02] focus-visible:bg-[#FE7C02] active:scale-95"
							>
								Send message <span aria-hidden="true" className="transition-[translate] duration-300 group-hover:translate-x-1">→</span>
							</button>
						</form>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}