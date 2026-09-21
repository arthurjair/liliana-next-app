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
      blurb: " A bilingual storybook: Dutch and Papiamento. This 2018 children's book gift from Aruba features 15 stories and poems by writers from Aruba, Curaçao, Suriname, Bonaire, and the Netherlands. With illustrations by Vanessa Paulina from Aruba. ",
    },
    {
      slug: "What-Does-Kiwi-Want-Now",
      title: "WHAT DOES KIWI WANT NOW?",
      image: "/books/Kiwi.webp",
      blurb: "Kiwi always gets what he wants. Everything... except the one thing he desires most: the Tri-Fox GX10! His dad has a Tri-Fox, his mom has one, and even his friends at school do. But is this popular gadget really what Kiwi needs?",
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
      blurb: "Jim gets to go on the boat. His uncle’s boat is called ‘De Haak’. A boat with a name? That’s strange. But there’s more...",
    },
    {
      slug: "On-an-Enchanted-Island",
      title: "ON AN ENCHANTED ISLAND",
      image: "/books/On-an-Enchanted-Island.webp",
      blurb: "A collection of five fairy tales in Papiamento, published in book form and as Kamishibai storytelling cards, commissioned by the Aruba Department of Education and the FDA.",
    },
    {
      slug: "Do-Not-Touch",
      title: "DO NOT TOUCH!",
      image: "/books/Do-Not-Touch.webp",
      blurb: "Rai has a friend; his name is Panda. They have a lot of fun together. But Panda has a serious problem. Panda is late for everything... Everything! Rai has to come up with a plan.",
    },
    {
      slug: "Antilla",
      title: "ANTILLA",
      image: "/books/Antilla.jpg",
      blurb: "A work of historical fantasy centered on one of the Caribbean’s major shipwrecks: the SS Antilla, a German cargo ship scuttled by its own crew just off the coast of Aruba during World War II. The vibrant underwater photographs and illustrations by Swiss visual artist Moritz Ebinger perfectly complement this imaginative, multilingual book, which encourages young readers to explore Aruba’s history.",
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
      blurb: "Nano the Dwarf feels like something is missing from his life. When he sets out to find that something, he gets lost but not for long.",
    },
    {
      slug: "Rima-Rond-Aruba-su-Status-Aparte",
      title: "RIMA ROND ARUBA SU STATUS APARTE",
      image: "/books/Rhyme-around.jpg",
      blurb: "A collection of children's poems, raps, and songs (Volume IV) in the native language of Papiamento, commemorating 25 years of Aruba's Status Aparte (independent status and autonomy within the Kingdom of the Netherlands).",
    },
    {
      slug: "Sigui-Rima-Rond-di-Aruba",
      title: "SIGUI RIMA ROND DI ARUBA",
      image: "/books/Keep-rhyming.jpg",
      blurb: "Collection of children's poems, raps, and songs (Volume III) in the native language, Papiamento.",
    },
    {
      slug: "It-was-Big",
      title: "IT WAS BIG!",
      image: "/books/It-Was-Big!.jpg",
      blurb: "Story about a girl's friendship with a piglet and learning about the true meaning of friendship #leveled reading books #dyslexia",
    },
    {
      slug: "Animal-in-Distress",
      title: "ANIMAL IN DISTRESS",
      image: "/books/Animal-in-Distress.jpg",
      blurb: "A story about a boy who goes on vacation to Aruba and his urge to rescue an abused dog.",
    },
    {
      slug: "My-Party",
      title: "MY PARTY",
      image: "/books/My-Party.jpg",
      blurb: "About a girl, Fleur, who organizes her own birthday party and everything that can go wrong on the most special day of her life.",
    },
    {
      slug: "Nano-e-Enano",
      title: "NANO E ENANO",
      image: "/books/Nano-e-enano.jpg",
      blurb: "This richly illustrated audio and storybook is a collection of radio plays in Papiamento and Dutch about the adventures of Nano (an Aruban dwarf) and his animal friends.",
    },
    {
      slug: "Hopus",
      title: "HOPUS",
      image: "/books/Hopus.jpg",
      blurb: "A picture book about a curious, magical white rabbit who is tired of being stuck in a magician’s hat and longs to discover the world outside. One day, he gets his chance and is surprised to find that life beyond the hat the only world he has ever known is unfamiliar and fascinating.",
    },
    {
      slug: "My-First-ABC's",
      title: "MY FIRST ABC'S",
      image: "/books/My-First-ABC's.jpg",
      blurb: "Aruba's first alphabet book",
    },


  ];

  return (
    <>
      <main className="p-4 lg:mt-10 sm:p-6">
        <h1 className="mb-6 text-sm uppercase tracking-[0.2em] text-stone-500">All Books</h1>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {books.map((book) => (
            <Link href={`/books/${book.slug}`} key={book.slug} className="block">
              <div className="group relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-stone-100">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-[75%] w-[70%] object-contain transition duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-start justify-center overflow-x-hidden overflow-y-auto bg-[#F6EF7A] p-5 opacity-0 transition duration-300 group-hover:opacity-100 sm:px-6">
                  <div className="min-w-0 max-w-full break-words text-black">
                    <h3 className="text-2xl font-semibold lg:text-4xl">{book.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed sm:mt-2 sm:text-sm lg:text-lg">{book.blurb}</p>
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