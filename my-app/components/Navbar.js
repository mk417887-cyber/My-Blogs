
"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Sidebar from "./Sidebar"


export default function Navbar() {
  const router = useRouter()
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 w-full  border-b bg-white px-6 py-3 flex items-center justify-between">


<button 
          onClick={() => setIsOpen(true)}
          className="text-2xl  hover:cursor-pointer"
        >
          ☰
        </button>

              {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* LEFT */}
      <div className="flex items-center gap-3 hover:cursor-pointer mx-5">
        <h1 onClick={() => router.push("/home")}
        className="text-blue-500 font-bold text-xl  hover:cursor-pointer ">My-Blogs</h1>
        <button
          onClick={() => router.push("/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          CREATE BLOG
        </button>
        <button
          onClick={() => router.push("/my-blogs")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          YOUR BLOGS
        </button>
      </div>

      {/* CENTER - SEARCH */}
      <div className="flex-1 flex justify-center px-2">
        <input
          type="text"
          placeholder="Search your interests..."
          className="w-full max-w-md px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 text-sm">

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="hover:text-blue-500"
          >
            Select your interest ▾
          </button>

          {open && (
            <div className="absolute top-8 left-0 bg-white border shadow-md rounded-md p-2 w-40">
              <p className="hover:bg-gray-100 px-2 py-1 cursor-pointer">All</p>
              <p className="hover:bg-gray-100 px-2 py-1 cursor-pointer">Commerce</p>
              <p className="hover:bg-gray-100 px-2 py-1 cursor-pointer">Daily</p>
              <p className="hover:bg-gray-100 px-2 py-1 cursor-pointer">Entertainment</p>
            </div>
          )}
        </div>
        <div>
          {!session ? (
            <>
              {/* Login Button */}
              <button onClick={() => signIn("google")}
               className="border border-blue-500 text-blue-500 px-4 py-1 rounded-full hover:bg-blue-50">
                Log in
              </button>

    
            </>
          ) : (
            <>
              <p className="text-black font-semibold">
                Welcome, {session.user.name}
              </p>

              {/* Logout Button */}
              <button
                onClick={() => signOut()}
                className="border border-blue-500 text-blue-500 px-20 py-1 rounded-full hover:bg-blue-500 hover:text-white transition"
              >
                Logout
              </button>

            </>
          )}
        </div>
      </div>
    </div>
  )
}