import Footer from "../components/footer";

export default function ContactPage() {
	return (
		<>
			<main className="flex-1 px-4 py-10 sm:px-6 lg:px-12 bg-white text-black">
				<div className="mx-auto max-w-6xl">
					<p className="text-sm uppercase tracking-[0.2em] text-stone-500">Contact</p>
					<div className="mt-0 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
						<div>
							<h1 className="md:text-8xl text-6xl font-medium leading-tight "></h1>
							<div className="mt-6 flex items-center gap-4">
                
             </div>
							
							
						</div>

						<form action="https://formspree.io/f/mdekeegy" method="post">
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

							<div className="grid gap-2 mt-4">
								<label htmlFor="email" className="text-sm font-medium">Email</label>
								<input id="email" name="email" type="email" autoComplete="email" required className="border-b border-black bg-transparent px-0 py-3 outline-none placeholder:text-stone-400 focus:border-stone-500" placeholder="you@example.com" />
							</div>

							<div className="grid gap-2 mt-4">
								<label htmlFor="reason" className="text-sm font-medium">I&apos;m here for...</label>
								<select id="reason" name="reason" required defaultValue="" className="border-b border-black bg-transparent px-0 py-3 outline-none focus:border-stone-500">
									<option value="" disabled>Select an option</option>
									<option value="book">A book inquiry</option>
									<option value="illustration">An illustration project</option>
									<option value="collaboration">A collaboration</option>
									<option value="other">Something else</option>
								</select>
							</div>

							<div className="grid gap-2 mt-4">
								<label htmlFor="message" className="text-sm font-medium">What should I know?</label>
								<textarea id="message" name="message" rows={5} required className="resize-y border-b border-black bg-transparent px-0 py-3 outline-none placeholder:text-stone-400 focus:border-stone-500" placeholder="Tell me a little about your project or question..." />
							</div>

							<button type="submit" className="w-fit mt-5 rounded-3xl flex  bg-black px-8 py-3 text-sm text-white transition-opacity hover:opacity-70">
								Send message
							</button>
						</form>
						<p className="text-sm uppercase tracking-[0.2em] text-stone-500">SOCIALS</p>
						<div className="mt-0 ml-0 md:ml-0 lg:ml-0 flex items-center gap-4">
							
							
               <a
                 href="https://www.instagram.com/globetrauthor/?utm_source=ig_web_button_share_sheet"
                 aria-label="Instagram"
                 className="transition-opacity hover:opacity-80"
                 target="_blank"
                 rel="noreferrer"
               >
                 <img src="/instagram-icon.webp" alt="Instagram" className="h-9 w-9" />
               </a>
               <a
                 href="https://www.linkedin.com/in/lilianaerasmus/"
                 aria-label="LinkedIn"
                 className="transition-opacity hover:opacity-80"
                 target="_blank"
                 rel="noreferrer"
               >
                 <img src="/linkedin-icon.webp" alt="LinkedIn" className="h-9 w-9" />
               </a>
             </div>
						
						
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}