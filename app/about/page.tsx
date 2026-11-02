import type { CSSProperties } from "react";
import Footer from "../components/footer";
import SocialLinks from "../components/sociallinks";
import Reveal from "../components/reveal";

// Marker-style highlight in the book-spine colors from the homepage.
// Colored text on white would be hard to read (especially yellow), so the color sits behind the text.
// On hover the highlight grows from the bottom half to the full word.
const highlightClass =
  "font-bold text-black box-decoration-clone bg-[linear-gradient(var(--mark),var(--mark))] bg-bottom bg-no-repeat [background-size:100%_40%] transition-[background-size] duration-300 hover:[background-size:100%_100%] focus-visible:[background-size:100%_100%]";

export default function AboutPage() {
  return (
    <>
      <main className="flex-1 bg-white px-4 py-8 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-6xl pb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">ABOUT ME</p>

          {/* Photo and text share one row of equal height:
              the text starts at the top of the photo and the icons end at its bottom. */}
          <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-[320px_1fr] lg:items-stretch lg:gap-16">
            <Reveal className="mx-auto w-full max-w-[320px] overflow-hidden lg:mx-0 lg:h-full">
              <img
                src="/About-me-photo.jpg"
                alt="Liliana Erasmus"
                className="h-[420px] w-full object-cover transition duration-700 ease-out hover:scale-[1.03] lg:h-full lg:min-h-[440px]"
              />
            </Reveal>

            <Reveal delay={150} className="flex flex-col justify-between gap-8">
              {/* -mt pulls the first line up so the letters (not the line box) line up with the photo */}
              <div className="max-w-2xl space-y-5 text-base leading-relaxed text-stone-700 lg:-mt-1.5 lg:text-lg">
                <p>
                  Liliana Erasmus is a Dutch Caribbean writer who has lived in The Netherlands and is back on her island Aruba where she writes for children of all ages and young adults. Her newest publication,{" "}
                  <a
                    href="/books/Zap-Zap-ZZZIENNG"
                    style={{ "--mark": "#EAC342" } as CSSProperties}
                    className={`${highlightClass} italic`}
                  >
                    Zap! Zap! Zzziennng!
                  </a>{" "}
                  (Aruba’s Children’s Book Festival Gift 2025) has been turned into an immersive, multi-purpose audiobook.
                </p>
                <p>
                  Her debut, the children’s poetry collection{" "}
                  <a
                    href="/books/Rhymes-Around-Aruba"
                    style={{ "--mark": "#E789B6" } as CSSProperties}
                    className={`${highlightClass} italic`}
                  >
                    Rhymes Around Aruba
                  </a>{" "}
                  is a local bestseller, and the start of Liliana’s career as an author (and illustrator) of children’s stories, poems, songs, radio and short plays in Papiamento, Dutch and English. In 2025 she received a grant from the{" "}
                  <a
                    href="https://www.letterenfonds.nl/en"
                    target="_blank"
                    rel="noreferrer"
                    style={{ "--mark": "#56C3EE" } as CSSProperties}
                    className={highlightClass}
                  >
                    Dutch Foundation for Literature
                  </a>{" "}
                  to write a Caribbean novel for young adults.
                </p>
              </div>

              <SocialLinks colorMode="always" />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}