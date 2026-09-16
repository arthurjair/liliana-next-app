
export default function Footer() {
  return <footer className="bg-black">
      <div className="flex">
        <div>
         <p className="  text-sm text-white py-6 px-2">
           <p className="mr-2 ">Books</p>
           <p className="mr-2 ">About me</p>
           
         </p>
        </div>
        <div>
          <p className="text-sm text-white py-6 px-2">
            <p className="mr-2 ">LinkedIn</p>
            <p className="mr-2 ">Contact</p>
          </p>
        </div>
      </div>

      
        
      <h1 className="text-white text-5xl font-bold px-2">Danki For your Curiosity!</h1>
      <div className="flex items-center">
         <div>
           <p className="text-white text-sm  px-4 py-3">Created by CUA Studio</p>
         </div>
        <div>
        <a href="#top" className="block text-white text-sm underline px-4 py-3">
            Go back up
         </a>
        </div>
      </div>
      
    </footer>
}