import localFont from "next/font/local";
import SecretAdminLink from "./secretadminlink";

const janeAust = localFont({
  src: "../fonts/JaneAust.ttf",
});

export default function Footer() {
  return (
    <footer className="bg-black rounded-t-lg">
      <h1 className="p-4 pl-5 text-5xl font-medium text-white lg:text-7xl lg:mt-3">
        {/* Secret: hold "Danki" for 3 seconds to open the news editor (/news-admin) */}
        <SecretAdminLink className={janeAust.className}>Danki</SecretAdminLink> <br></br>for your Curiosity!
      </h1>
      {/* Extra space at the bottom on phones: Safari on iPhone shows its toolbar when you
          tap near the very bottom of the screen, which used to swallow the "Go back up" tap. */}
      <div className="flex w-full items-center justify-between gap-4 px-5 pb-12 pt-3 sm:pb-4">
        <p className="text-sm text-white">Created by CUA Studio</p>
        <a
          href="#top"
          className="group inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/40 px-4 text-sm text-white transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          Go back up
          <span aria-hidden="true" className="leading-none transition-[translate] duration-300 ease-out group-hover:-translate-y-0.5">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}