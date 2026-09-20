
import localFont from "next/font/local";

const janeAust = localFont({
  src: "../fonts/JaneAust.ttf",
});

export default function Footer() {
  return <footer className="bg-black rounded-t-lg ">
      <div className="flex pt-3 pl-5 gap-3">
        <div>
         <p className="  text-sm text-white py-1 lg:text-xl ">
           Books
          </p>
          <p className="  text-sm text-white py-1 lg:text-xl ">
           About Me
          </p>
           
         
        </div>
        <div className="pb-3 ">
          <p className="  text-sm text-white py-1 px-2 lg:text-xl">
           Contact
          </p>
          <p className="  text-sm text-white py-1 px-2 lg:text-xl">
           LinkedIn
          </p>
        </div>
      </div>

      
        
      <h1 className="p-4 pl-5 text-5xl font-medium text-white lg:text-7xl">
        <span className={janeAust.className}>Danki</span> <br></br>for your Curiosity!
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
}