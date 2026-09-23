import Footer from "../components/footer";
import Link from "next/link";

export default function BooksPage() {
  const books = [
    {
      slug: "Zap-Zap-ZZZIENNG",
      title: "ZAP ZAP ZZZIENNG!",
      image: "/books/Zap.webp",
      blurb: "The Adventures of Chispito tells a sparkling and imaginative story about friendship, imagination, and pushing your boundaries. A delightful gift for all the children of Aruba, brimming with light and a zest for life. Another piece of art by Dutch illustrator Daniëlle Schothorst. Levendig Uitgever, 2025",
    },
    {
      slug: "Aza-and-the-magic-doors",
      title: "AZA AND THE MAGIC DOORS",
      image: "/books/Aza.webp",
      blurb: "Aza doesn’t like to read. During a game of hide-and-seek in the library, she ends up in the Story Tower and discovers a magical book that comes to life. This bilingual Children’s Book Festival Gift 2024 is illustrated by Dutch artist Daniëlle Schothorst.Levendig Uitgever, 2024",
    },
    {
      slug: "the-murf",
      title: "THE MURF",
      image: "/books/The-murf.webp",
      blurb: "Liza lives on an island and talks to animals, but the boy next door, Tom, doesn't believe her. When they find a wild stray dog, they’ll try to tame it. But would Liza be allowed to keep the dog? Colorful illustrations by Dutch artist duo ivan & ilia. Uitgeverij Zwijsen, 2024",
    },
    {
      slug: "Zie-wie-je-bent",
      title: "BE WHO YOU ARE, BECOME WHO YOU WANT TO BE",
      image: "/books/Zijn-wie-je.webp",
      blurb: "A collection of poems for children in Dutch. A special Children's Book Week 2021 edition containing poems written by authors from Aruba, Bonaire, Curaçao and The Netherlands. With illustrations by Aruban artist Vanessa Paulina and Dutch illustrator Helen van Vliet. Levendig Uitgever, 2021",
    },
    {
      slug: "Schelpeneiland",
      title: "ORA UBAO, SHELL ISLAND",
      image: "/books/Schelpeneiland.webp",
      blurb: "Bilingual children's book gift for Aruba's Children's Book Festival 2020 containing stories and poems written by authors from Aruba and The Netherlands. Illustrations by Aruban artist Elvis Tromp. Levendig Uitgever, 2020",
    },
    {
      slug: "Friends-Everywhere",
      title: "FRIENDS EVERYWHERE",
      image: "/books/Friends-everywhere.webp",
      blurb: " This bilingual children's book gift for Aruba's Children's Book Festival 2018 contains stories and poems written by authors from Aruba, Curaçao, Suriname, Bonaire and The Netherlands. Illustrations by Aruban artist Vanessa Paulina. Levendig Uitgever, 2018",
    },
    {
      slug: "What-Does-Kiwi-Want-Now",
      title: "WHAT DOES KIWI WANT NOW?",
      image: "/books/Kiwi.webp",
      blurb: "Kiwi always gets what he wants, except what he desires most: the Tri-Fox GX10. His dad has a Tri-Fox, his mom has one, even his friends at school. But, is this popular gadget what Kiwi really needs? This kamishibai (Japanese paper play) story is a production of Kiwanis Club Of Aruba to raise awareness on the dangers of device addicition. Levendig Uitgever, 2017",
    },
    {
      slug: "Ghosts-and-Monsters-Everywhere",
      title: "GHOSTS AND MONSTERS EVERYWHERE",
      image: "/books/Ghosts-monsters.webp",
      blurb: "The stories and poems come from all the corners of the world. Inspired by personal memories, legends and fairy tales. The book matches the Children’s Book Week 2017’s theme ‘Creepingly Scary’. Illustrations by Aruban artist Vanessa Paulina. Levendig Uitgever, 2017 (Aruba & The Netherlands)",
    },
    {
      slug: "On-an-Enchanted-Island",
      title: "ON AN ENCHANTED ISLAND",
      image: "/books/On-an-Enchanted-Island.webp",
      blurb: "A collection of fairy tales in Papiamento published in book and kamishibai story cards format, commissioned by the Department of Education of Aruba and FDA (Development Funds Aruba) Penta Educatief, 2016",
    },
    {
      slug: "Grandmas-and-Grandpas-Everywhere",
      title: "GRANDMAS AND GRANDPAS EVERYWHERE",
      image: "/books/Grandmas-grandpas.webp",
      blurb: "The stories and poems come from all the corners of the world. Inspired by personal memories or by legends and fairy tales from forgotten times. The book matches the Children’s Book Week 2016’s theme ‘Grandma’s and Grandma’s - Forever Young’. Illustrations by Dutch artist Mariëlla van de Beek. Levendig Uitgever, 2016 (Aruba & The Netherlands)",
    },
  
    {
      slug: "A-Ray-on-the-Hook",
      title: "A RAY ON THE HOOK",
      image: "/books/A-Ray.jpg",
      blurb: "Jim is going on a boat trip. His uncle has a boat called 'The Hook'. A boat with a name? That's weird, but not all. There's much more weirdness on the way. Intended for the earliest readers (5+) with easy-view pages and attractive illustrations by Dutch artist Peter van Harmelen. Uitgeverij Zwijsen, 2015 (The Netherlands and Belgium)",
    },
    {
      slug: "Do-Not-Touch",
      title: "DO NOT TOUCH!",
      image: "/books/Do-Not-Touch.webp",
      blurb: "Rai has a friend, his name is Panda. They have a lot of fun together. But Panda has a problem. Panda can't stop touching... Everything! Rai needs to come up with a plan. This kamishibai (Japanese paper play) story is a co-production of Kiwanis Club Of Aruba and the Respeta Mi Foundation to promote and support comprehensive sex education in all local schools on the island at an earliest age possible. Levendig Uitgever, 2015",
    },
    
    {
      slug: "Antilla",
      title: "ANTILLA",
      image: "/books/Antilla.jpg",
      blurb: "Historical Fantasy about one of the largest shipwrecks in the Caribbean; the SS Antilla, a German freighter scuttled by its own crew, right off the coast of Aruba during World War II. The colorful underwater photos and illustrations of Swiss visual artist Moritz Ebinger perfectly match this imaginative multilingual book that encourages young readers to explore Aruba's history. Nederlands Letterenfonds/ Moritz Ebinger, 2014",
    },
    {
      slug: "The-Hand-Dynamo",
      title: "THE HAND DYNAMO",
      image: "/books/The-Flashlight.jpg",
      blurb: "Loes moves to an old house on a tropical island. There she finds an antique hand dynamo lamp. Surrounded by the mysterious light she catches a glimpse of the past and hears someone sing. Her neighbor talks about a girl who’s disappeared a long time ago.Illustrations by Dutch artist Wilbert van der Steen. Uitgeverij Delubas, 2012 (The Netherlands and Belgium)",
    },
    {
      slug: "Nano-y-nena",
      title: "NANO Y NENA",
      image: "/books/Nano-y-nena.jpg",
      blurb: "Nano the dwarf feels that there's something missing in his life. When he sets off to find that something, he gets lost in the wilderness. But not for long. Illustrations by Dutch artist Daniëlle Schothorst. Fundacion Papiamente, 2011 Kamishibai story cards, 2015",
    },
    {
      slug: "Rima-Rond-Aruba-su-Status-Aparte",
      title: "RIMA ROND ARUBA SU STATUS APARTE",
      image: "/books/Rhyme-around.jpg",
      blurb: "Children's poems and songs (volume IV) to commemorate 25 years of Aruba's Status Aparte (independent status and autonomy within the Kingdom of The Netherlands) Fundacion Papiamente & The Ministry of Culture of Aruba, 2011",
    },
    {
      slug: "Sigui-Rima-Rond-di-Aruba",
      title: "SIGUI RIMA ROND DI ARUBA",
      image: "/books/Keep-rhyming.jpg",
      blurb: "Children's poems and songs (volume III) in native language Papiamento. Fundacion Papiamente, 2010",
    },
    {
      slug: "It-was-Big",
      title: "IT WAS BIG!",
      image: "/books/It-Was-Big!.jpg",
      blurb: "Piglet is Lien’s friend, but she keeps blaming him whenever she gets in trouble. Illustrations by Dutch artist Irma Ruifrok. Uitgeverij Zwijsen, 2007, 2008, 2010, 2011 (The Netherlands & Belgium)",
    },
    {
      slug: "Animal-Rescue",
      title: "ANIMAL RESCUE",
      image: "/books/Animal-in-Distress.jpg",
      blurb: "Luuk is going by plane to grandpa and grandma. They live on an island, far away. They have a sunny house with a large garden. But their neighbor is a monster. He ties his dog to a chain. The poor animal whimpers from thirst. Luuk has to do something about this! Illustrations by Flemish artist Leo Timmers. Uitgeverij Zwijsen, 2008, 2016 (The Netherlands & Belgium)",
    },
    {
      slug: "My-Party",
      title: "MY PARTY",
      image: "/books/My-Party.jpg",
      blurb: "Fleur is organizing her own birthday party and everything that can go wrong on her most special day … Illustrations by Dutch artist Erica Ringelberg. Uitgeverij Zwijsen, 2008 (The Netherlands & Belgium)",
    },
    {
      slug: "Nano-e-Enano",
      title: "NANO THE DWARF (MYSTERIES OF THE LOST WILDERNESS)",
      image: "/books/Nano-e-enano.jpg",
      blurb: "This richly illustrated dual language audio and story book is a collection of radio plays in Papiamento and Dutch about the adventures of an Aruban dwarf and his animal friends. Aruba's Children's Book Festival Gift 2007 with illustrations by Dutch artist Daniëlle Schothorst. Fundacion Papiamente, 2007",
    },
    {
      slug: "More-Rhymes-Around-Aruba",
      title: "MORE RHYMES AROUND ARUBA",
      image: "/books/More-Rhymes-Around-Aruba.jpg",
      blurb: "Children's poems and songs (volume II) in native language Papiamento.Fundacion Papiamente, 2005",
    },
    {
      slug: "Hopus",
      title: "HOPUS",
      image: "/books/Hopus.jpg",
      blurb: "Hopus, the curious and magical rabbit, is tired of being confined inside the magician’s hat, and longs to explore the outside world. One day, he gets his chance and is surprised to discover that life outside the hat, the only world he has ever known, is unfamiliar and exciting. Aruba's first Children's Book Festival Gift with illustrations by Dutch artist Daniëlle Schothorst. Fundacion Papiamente, 2005 Uitgeverij Zwijsen, 2006, 2015 (The Netherlands & Belgium) Kamishibai story cards, 2014",
    },
    {
      slug: "My-First-ABC's",
      title: "MY FIRST ABC'S",
      image: "/books/My-First-ABC's.jpg",
      blurb: "Aruba's first alphabet book. Fundacion Papiamente, 2004, 2009",
    },
    {
      slug: "Rhymes-Around-Aruba",
      title: "RHYMES AROUND ARUBA",
      image: "/books/Rhymes-Around-Aruba.jpg",
      blurb: "Children's poems and songs (Volume I) in native language Papiamento. Editorial Charuba, 2003 Fundacion Papiamente, 2009 ",
    },


  ];

  return (
    <>
      <main className="p-4  sm:p-6 bg-white">
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