import Footer from "../components/footer";
import Link from "next/link";

export default function BooksPage() {
  const books = [
    {
      slug: "Zap-Zap",
      title: "Zap Zap Zzzienng!",
      image: "/books/Zap.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Aza-and-the-magic-doors",
      title: "Aza and the Magic Doors",
      image: "/books/Aza.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "the-murf",
      title: "The Murf",
      image: "/books/The-murf.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Zie-wie-je-bent",
      title: "Zijn wie je bent, Worden wat je wilt",
      image: "/books/Zijn-wie-je.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Schelpeneiland",
      title: "Shell Island",
      image: "/books/Schelpeneiland.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Friends-Everywhere",
      title: "Friends Everywhere",
      image: "/books/Friends-everywhere.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "What-Does-Kiwi-Want-Now",
      title: "What Does Kiwi Want Now?",
      image: "/books/Kiwi.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Ghosts-and-Monsters-Everywhere",
      title: "Ghosts and Monsters Everywhere",
      image: "/books/Ghosts-monsters.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Grandmas-and-Grandpas-Everywhere",
      title: "Grandmas and Grandpas Everywhere",
      image: "/books/Grandmas-grandpas.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "A-Ray-on-the-Hook",
      title: "A Ray on the Hook",
      image: "/books/A-Ray.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "On-an-Enchanted-Island",
      title: "On an Enchanted Island",
      image: "/books/On-an-Enchanted-Island.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Do-Not-Touch",
      title: "Do Not Touch!",
      image: "/books/Do-Not-Touch.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Antilla",
      title: "Antilla",
      image: "/books/Antilla.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "The-Flashlight",
      title: "The Flashlight",
      image: "/books/The-Flashlight.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Nano-y-nena",
      title: "Nano & Nena",
      image: "/books/Nano-y-nena.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Rima-Rond-Aruba-su-Status-Aparte",
      title: "Rima Rond Aruba su Status Aparte ",
      image: "/books/Rhyme-around.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Sigui-Rima-Rond-di-Aruba",
      title: "Sigui Rima Rond di Aruba",
      image: "/books/Keep-rhyming.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "It-was-Big",
      title: "It was Big!",
      image: "/books/Hopus.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Animal-in-Distress",
      title: "Animal in Distress",
      image: "/books/Hopus.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "My-Party",
      title: "My Party",
      image: "/books/Hopus.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Nano-e-Enano",
      title: "Nano e Enano",
      image: "/books/Hopus.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Hopus",
      title: "Hopus",
      image: "/books/Hopus.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "My-First-ABC's",
      title: "My First ABC's",
      image: "/books/My-First-ABC's.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },


  ];

  return (
    <>
      <main className="p-4 sm:p-6">
        <h1 className="mb-6 text-4xl font-bold">All Books</h1>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {books.map((book) => (
            <Link href={`/books/${book.slug}`} key={book.slug} className="block">
              <div className="group relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-stone-100">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-[75%] w-[70%] object-contain transition duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-[#F6EF7A] opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="px-3 text-center text-black sm:px-6">
                    <h3 className="text-sm font-medium sm:text-xl">{book.title}</h3>
                    <p className="mt-1 text-[10px] leading-relaxed sm:mt-2 sm:text-sm">{book.blurb}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}