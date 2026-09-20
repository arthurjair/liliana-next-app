import Footer from "../components/footer";
import Link from "next/link";

export default function BooksPage() {
  const books = [
    {
      slug: "Zap-Zap-ZZZIENNG",
      title: "ZAP ZAP ZZZIENNG!",
      image: "/books/Zap.webp",
      blurb: "The Adventures of Chispito tells a sparkling and imaginative story about friendship, imagination, and pushing your boundaries. A delightful book for all the children of Aruba, brimming with light and a zest for life.",
    },
    {
      slug: "Aza-and-the-magic-doors",
      title: "AZA AND THE MAGIC DOORS",
      image: "/books/Aza.webp",
      blurb: "For Aza, reading is no fun. She always has to behave herself in the library. Books with pictures are okay, I suppose. But books with lots of text... brrr.",
    },
    {
      slug: "the-murf",
      title: "THE MURF",
      image: "/books/The-murf.webp",
      blurb: "Liza lives on an island and talks to wild animals. Her neighbor Tom doesn't believe a word of it.But he hasn't lived on the island for very long. When Liza tries to rescue a stray dog, Tom and his poodle Desie help out. Can Liza tame this rascal?",
    },
    {
      slug: "Zie-wie-je-bent",
      title: "BE WHO YOU ARE, BECOME WHO YOU WANT TO BE",
      image: "/books/Zijn-wie-je.webp",
      blurb: "The twenty-two poems in this collection feature a wide range of professions , dream jobs, jobs once dreamed of, and dreams that never came true. Written by both well-known and lesser-known poets, they all come from the heart to celebrate a life in which everyone plays their own unique role.",
    },
    {
      slug: "Schelpeneiland",
      title: "SHELL ISLAND",
      image: "/books/Schelpeneiland.webp",
      blurb: "Different stories about the very first inhabitants of Aruba up to the carnival, The art in San Nicolas, The horses in the Horse Bay, Doctor Ancho, The Indians, Maria Largo and The Alta Vista Chapel. Different stories for ages 4 to 12 years.",
    },
    {
      slug: "Friends-Everywhere",
      title: "FRIENDS EVERYWHERE",
      image: "/books/Friends-everywhere.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "What-Does-Kiwi-Want-Now",
      title: "WHAT DOES KIWI WANT NOW?",
      image: "/books/Kiwi.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Ghosts-and-Monsters-Everywhere",
      title: "GHOSTS AND MONSTERS EVERYWHERE",
      image: "/books/Ghosts-monsters.webp",
      blurb: "The stories and poems in this book come from Aruba and the Netherlands from everywhere, and sometimes even from nowhere. They are inspired by nightmares and memories, and by stories, legends, and fairy tales from both the present and times gone by.",
    },
    {
      slug: "Grandmas-and-Grandpas-Everywhere",
      title: "GRANDMAS AND GRANDPAS EVERYWHERE",
      image: "/books/Grandmas-grandpas.webp",
      blurb: "Surprising or obvious, lighthearted or serious, humorous yet fun, the stories and poems in Overal opa’s en oma’s hebben wat te vertellen and invite you to read them aloud to your children and grandchildren!",
    },
    {
      slug: "A-Ray-on-the-Hook",
      title: "A RAY ON THE HOOK",
      image: "/books/A-Ray.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "On-an-Enchanted-Island",
      title: "ON AN ENCHANTED ISLAND",
      image: "/books/On-an-Enchanted-Island.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Do-Not-Touch",
      title: "DO NOT TOUCH!",
      image: "/books/Do-Not-Touch.webp",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Antilla",
      title: "ANTILLA",
      image: "/books/Antilla.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "The-Flashlight",
      title: "THE FLASHLIGHT",
      image: "/books/The-Flashlight.jpg",
      blurb: "Loes moves into an old house on a tropical island. There, she finds an old-fashioned squeeze flashlight. In its mysterious light, she catches a glimpse of the past and hears someone singing. Her neighbor tells her that a girl disappeared there a long time ago...",
    },
    {
      slug: "Nano-y-nena",
      title: "NANO Y NENA",
      image: "/books/Nano-y-nena.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Rima-Rond-Aruba-su-Status-Aparte",
      title: "RIMA ROND ARUBA SU STATUS APARTE",
      image: "/books/Rhyme-around.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Sigui-Rima-Rond-di-Aruba",
      title: "SIGUI RIMA ROND DI ARUBA",
      image: "/books/Keep-rhyming.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "It-was-Big",
      title: "IT WAS BIG!",
      image: "/books/It-Was-Big!.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Animal-in-Distress",
      title: "ANIMAL IN DISTRESS",
      image: "/books/Animal-in-Distress.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "My-Party",
      title: "MY PARTY",
      image: "/books/My-Party.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Nano-e-Enano",
      title: "NANO E ENANO",
      image: "/books/Nano-e-enano.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "Hopus",
      title: "HOPUS",
      image: "/books/Hopus.jpg",
      blurb: "A poetic journey through memory, distance, and belonging.",
    },
    {
      slug: "My-First-ABC's",
      title: "MY FIRST ABC'S",
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

                <div className="absolute inset-0 flexitems-center justify-center bg-[#F6EF7A] opacity-0 transition duration-300 group-hover:opacity-100">
                  <div className="p-5 text-black sm:px-6">
                    <h3 className="text-lg  font-medium ">{book.title}</h3>
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