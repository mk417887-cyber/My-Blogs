"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"



export default function Sidebar({ isOpen, setIsOpen }) {

      const [open, setOpen] = useState(false)   

      const { data: session, status } = useSession()

      if (status === "loading") return null

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-orange-500 font-bold">MyBlog</h2>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <nav className="flex flex-col p-4 gap-4">
          <Link href="/home" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/create" onClick={() => setIsOpen(false)}>
            Create Blog
          </Link>
             {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="hover:text-orange-500"
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
              className="border border-orange-500 text-orange-500 px-4 py-1 rounded-full hover:bg-orange-50">
                Log in 
              </button>

        
            </>
          ) : (
            <>
            <div className="bottom-0">
            
              <p className="text-black font-semibold">
                Welcome, {session.user.name}
              </p>

              {/* Logout Button */}
              <button 
                onClick={() => signOut()}
                className="border border-orange-500 text-orange-500 px-20 py-1 rounded-full hover:bg-orange-500 hover:text-white transition "
              >
                Logout
              </button>

            </div>

            </>
          )}
        </div>
        </nav>
      </div>
    </>
  )
}