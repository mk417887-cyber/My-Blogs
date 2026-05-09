// /components/StartButton.js
"use client"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function StartButton() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleClick = () => {
    if (!session) {
      // Not logged in → Google Sign In
      signIn("google", { callbackUrl: "/home" })
    } else {
      // Already logged in → go to home
      router.push("/home")
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
    >
      CREATE YOUR BLOG
    </button>
  )
}