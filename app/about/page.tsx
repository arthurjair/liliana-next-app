import Footer from "../components/footer";

export default function AboutPage() {
  return (
    <>
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl pb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">ABOUT ME</p>
          <div className="mt-10 lg:mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="relative mx-auto w-fit">
              
              <div className="flex items-center justify-center">
                <img src="/About-me-photo.jpg" alt="Liliana Erasmus" />
              </div>
              
            </div>
            <div className="flex justify-center items-center ">
             <p className="mt-6 lg:w-100 text-left md:text-left text-md lg:text-2xl leading-relaxed text-stone-700">
               I am a passionate author and illustrator, dedicated to bringing stories to life through my words and artwork. With a love for storytelling and a keen eye for detail, I strive to create captivating experiences for readers of all ages.
             </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}