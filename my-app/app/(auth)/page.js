import SignInButton from "@/components/SignInButton"
import StartButton from "../../components/StartButton"


export default function Home() {
  return(
    <>
  
    <div
    className="relative h-screen w-full bg-cover bg-center"
    style={{ backgroundImage: "url('https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?cs=srgb&dl=pexels-pixabay-262508.jpg&fm=jpg')" }}
  >

      {/* Overlay (important for readability) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full text-white">

        {/* Navbar */}
        <div className="flex justify-between items-center px-8 py-5">
          <h1 className="text-xl font-bold">MyBlog</h1>

          <div  className="text-sm font-semibold hover:underline">
          <SignInButton/>
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Publish your passions, your way
          </h1>

          <p className="text-lg md:text-xl mb-6 text-gray-200">
            Create a unique and beautiful blog easily.
          </p>

          <StartButton/>
        </div>

      </div>
</div>
</>

  )
}
