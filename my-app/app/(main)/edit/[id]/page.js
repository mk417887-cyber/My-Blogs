"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditBlog() {
  const { id } = useParams()
  const router = useRouter()

  const [blog, setBlog] = useState(null)

  useEffect(() => {

    const fetchBlog = async () => {
  
      const res = await fetch(`/api/blogs/${id}`)
  
      const data = await res.json()
  
      setBlog(data)
    }
  
    fetchBlog()
  
  }, [id])

  const handleUpdate = async () => {

    await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
  
    alert("Blog Updated!")
  
    router.push("/my-blogs")
  }

  if (!blog) return <p>Loading...</p>

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <input
        value={blog.title}
        onChange={(e) =>
          setBlog({ ...blog, title: e.target.value })
        }
        className="w-full border p-2 mb-2"
      />

      <textarea
        value={blog.content}
        onChange={(e) =>
          setBlog({ ...blog, content: e.target.value })
        }
        className="w-full border p-2 mb-2"
      />

      <button
        onClick={handleUpdate}
        className="bg-orange-500 text-white px-4 py-2"
      >
        Update
      </button>

    </div>
  )
}