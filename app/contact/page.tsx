import Footer from "../components/footer";

export default function ContactPage() {
	return (
		<>
			<main className="flex-1 px-4 py-10 sm:px-6 lg:px-12">
				<div className="mx-auto max-w-6xl">
					<p className="text-sm uppercase tracking-[0.2em] text-stone-500">Contact</p>
					<div className="mt-4 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
						<div>
							<h1 className="text-8xl  font-medium leading-tight ">Let&apos;s Talk!</h1>
							<p className="mt-6 max-w-md text-lg leading-relaxed text-stone-700">
								Feeling interested or inspired by some of my work? Looking for more information? Feel free to send me a message.
							</p>
						</div>

						<form action="https://formspree.io/f/YOUR_FORM_ID" method="post">
							<div className="grid gap-6 sm:grid-cols-2">
								<div className="grid gap-2">
									<label htmlFor="first-name" className="text-sm font-medium">First name</label>
									<input id="first-name" name="firstName" type="text" autoComplete="given-name" required className="border-b border-black bg-transparent px-0 py-3 outline-none placeholder:text-stone-400 focus:border-stone-500" placeholder="Your first name" />
								</div>
								<div className="grid gap-2">
									<label htmlFor="last-name" className="text-sm font-medium">Last name</label>
									<input id="last-name" name="lastName" type="text" autoComplete="family-name" required className="border-b border-black bg-transparent px-0 py-3 outline-none placeholder:text-stone-400 focus:border-stone-500" placeholder="Your last name" />
								</div>
							</div>

							<div className="grid gap-2">
								<label htmlFor="email" className="text-sm font-medium">Email</label>
								<input id="email" name="email" type="email" autoComplete="email" required className="border-b border-black bg-transparent px-0 py-3 outline-none placeholder:text-stone-400 focus:border-stone-500" placeholder="you@example.com" />
							</div>

							<div className="grid gap-2">
								<label htmlFor="reason" className="text-sm font-medium">I&apos;m here for...</label>
								<select id="reason" name="reason" required defaultValue="" className="border-b border-black bg-transparent px-0 py-3 outline-none focus:border-stone-500">
									<option value="" disabled>Select an option</option>
									<option value="book">A book inquiry</option>
									<option value="illustration">An illustration project</option>
									<option value="collaboration">A collaboration</option>
									<option value="other">Something else</option>
								</select>
							</div>

							<div className="grid gap-2">
								<label htmlFor="message" className="text-sm font-medium">What should I know?</label>
								<textarea id="message" name="message" rows={5} required className="resize-y border-b border-black bg-transparent px-0 py-3 outline-none placeholder:text-stone-400 focus:border-stone-500" placeholder="Tell me a little about your project or question..." />
							</div>

							<button type="submit" className="w-fit mt-5 rounded-3xl flex  bg-black px-8 py-3 text-sm text-white transition-opacity hover:opacity-70">
								Send message
							</button>
						</form>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}