import Footer from "../components/footer";


export default function AboutPage() {
  return (
    <>
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-12  bg-white">
        <div className="mx-auto max-w-6xl pb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">ABOUT ME</p>
          <div className="mt-10 lg:mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="relative mx-auto w-fit">
              <div className="flex items-center justify-center lg:mt-20 ">
                <img
                  src="/About-me-photo.jpg"
                  alt="Liliana Erasmus"
                  className="h-[420px] w-[300px] object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-start">
             <p className=" p-2 ml-10 text-left md:text-left text-sm lg:text-2xl w-[75vw] md:w-90 md:ml-45 lg:ml-0 lg:w-full leading-relaxed justify-center items-center text-stone-700">
               Liliana Erasmus is a Dutch Caribbean writer who has lived in The Netherlands and is back on her island Aruba where she writes for children of all ages and young adults. Her newest publication, <a href="/books/Zap-Zap-ZZZIENNG" className="font-bold  italic hover:text-yellow-300 hover:text-stone-900">Zap! Zap! Zzziennng!</a> (Aruba’s Children’s Book Festival Gift 2025) has been turned into an immersive, multi-purpose audiobook. <br></br> <br></br>Her debut, the children’s poetry collection <a href="/books/Rhymes-Around-Aruba" className="font-bold  italic hover:text-red-400 hover:text-stone-900">Rhymes Around Aruba</a> is a local bestseller, and the start of Liliana’s career as an author (and illustrator) of children’s stories, poems, songs, radio and short plays in Papiamento, Dutch and English. In 2025 she received a grant from the <a href="https://www.letterenfonds.nl/en" className="font-bold  hover:text-stone-900">Dutch Foundation for Literature</a> to write a Caribbean novel for young adults.
             </p>

             <div className="mt-6 ml-14 md:ml-50 lg:ml-2 flex items-center gap-4">
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
        </div>
      </main>
      <Footer />
    </>
  );
}