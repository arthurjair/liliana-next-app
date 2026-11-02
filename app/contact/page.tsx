import localFont from "next/font/local";
import Footer from "../components/footer";
import SocialLinks from "../components/sociallinks";

const janeAust = localFont({
	src: "../fonts/JaneAust.ttf",
});

// A little shelf of book spines in the homepage colors (decoration only).
const spines = [
	{ color: "#EAC342", height: "h-28", rotate: "0deg" },
	{ color: "#2E9EFF", height: "h-32", rotate: "0deg" },
	{ color: "#E789B6", height: "h-24", rotate: "0deg" },
	{ color: "#A4C639", height: "h-30", rotate: "0deg" },
	{ color: "#FE7C02", height: "h-26", rotate: "0deg" },
	{ color: "#56C3EE", height: "h-32", rotate: "12deg" },
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

							<div aria-hidden="true" className="mt-12 hidden items-end gap-1.5 border-b-2 border-black pb-0 lg:mt-auto lg:flex">
								{spines.map((spine, i) => (
									<div
										key={i}
										className={`${spine.height} w-7 origin-bottom-left shadow-md`}
										style={{ backgroundColor: spine.color, transform: `rotate(${spine.rotate})` }}
									/>
								))}
							</div>
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
								className="mt-6 flex w-fit items-center gap-2 rounded-3xl bg-black px-8 py-3 text-sm text-white transition-colors duration-200 hover:bg-[#FE7C02] focus-visible:bg-[#FE7C02]"
							>
								Send message <span aria-hidden="true">→</span>
							</button>
						</form>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}