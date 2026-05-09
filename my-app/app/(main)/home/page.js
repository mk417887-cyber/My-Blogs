"use client"
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react"
import Link from "next/link"

export default function HomePage() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
      const fetchBlogs = async () => {
    
        const res = await fetch("/api/blogs")
    
        const data = await res.json()
    
        setBlogs(data)
      }
    
      fetchBlogs()
    }, [])

    return (
        <>
            

            <div className="p-8">

{blogs.length === 0 ? (
  <div className="text-center text-gray-500 mt-20">
    <p className="text-xl">No blog posted yet 😔</p>
  </div>
) : (
  <div className="grid gap-6">
    {blogs.map((b) => (
      <Link key={b.id} href={`/blog/${b.id}`}>
        <div className="border p-4 flex gap-4 cursor-pointer hover:shadow">

        <img
  src={b.images?.[0]}
  className="w-40 h-28 object-cover rounded"
/>

          <div>
            <h2 className="font-bold text-lg">{b.title}</h2>
            <p className="text-gray-600">{b.meta}</p>
          </div>

        </div>
      </Link>
    ))}
  </div>
)}

</div>

        </>
    )
}