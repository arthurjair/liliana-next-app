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
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="text-white text-sm px-5 py-3">Created by CUA Studio</p>
        </div>
        <div>
          <a href="#top" className="inline-flex items-center gap-1 text-white text-sm px-5 py-3 text-right">
            Go back up <span aria-hidden="true" className="w-3 h-4 leading-none">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}