"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function CreateBlog() {
  const { data: session } = useSession()
    const router = useRouter()

  const [blog, setBlog] = useState({
    title: "",
    meta: "",
    content: "",
    images: [],
    tags: "",



  })

  const [imageInput, setImageInput] = useState("")

  const handleSubmit = async () => {

    const blogData = {
      ...blog,
  
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      userImage: session?.user?.image,
    }
  
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
  
    const data = await res.json()
  
    console.log(data)
  
    alert("Blog Created!")
  }

  return (
    <>
    

    <div className="text-center text-4xl font-bolder mt-4 mb-1 text-orange-500">
        Create Your Blog
    </div>
    <div className="p-8 max-w-2xl mx-auto space-y-4">

      <input
        placeholder="Title"
        className="w-full border p-2"
        onChange={(e) => setBlog({...blog, title: e.target.value})}
      />

      <input
        placeholder="Meta Description"
        className="w-full border p-2"
        onChange={(e) => setBlog({...blog, meta: e.target.value})}
      />

    <input
  placeholder="Paste image URL and click Add"
  className="w-full border p-2"
  value={imageInput}
  onChange={(e) => setImageInput(e.target.value)}
/>

<button
  onClick={() => {
    if (!imageInput) return
    setBlog({
      ...blog,
      images: [...blog.images, imageInput]
    })
    setImageInput("")
  }}
  className="bg-orange-500 text-white px-3 py-1"
>
  Add Image
</button>

<div className="flex gap-2 overflow-x-auto">
  {blog.images.map((img, i) => (
    <img
      key={i}
      src={img}
      className="w-24 h-24 object-cover rounded"
    />
  ))}
</div>

      <input
        placeholder="Tags (comma separated)"
        className="w-full border p-2"
        onChange={(e) => setBlog({...blog, tags: e.target.value})}
      />

      <textarea
        placeholder="Write your blog..."
        className="w-full border p-2 h-40"
        onChange={(e) => setBlog({...blog, content: e.target.value})}
      />

      <button
        onClick={handleSubmit}
        
        className="bg-orange-500 text-white px-4 py-2"
      >
        Publish
      </button>
    </div>
    </>
  )
}