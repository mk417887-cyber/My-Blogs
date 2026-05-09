"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([])
  const { data: session } = useSession()

  useEffect(() => {

    const fetchBlogs = async () => {
  
      const res = await fetch("/api/blogs")
  
      const data = await res.json()
  
      const userBlogs = data.filter(
  (b) => b.userEmail === session?.user?.email
)

setBlogs(userBlogs)
    }
  
    fetchBlogs()
  
  }, [])

  const handleDelete = async (id) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this blog?"
    )
  
    if (!confirmDelete) return
  
    await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    })
  
    setBlogs((prev) =>
      prev.filter((b) => b._id !== id)
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs created yet</p>
      ) : (
        <div className="flex flex-col gap-4">

          {blogs.map((b) => (
            <div
              key={b.id}
              className="flex gap-4 border p-4 rounded hover:shadow"
            >

              {/* Image */}
              <img
                src={b.images?.[0]}
                className="w-32 h-24 object-cover rounded"
              />

              {/* Content */}
              <div className="flex-1">

                <h2 className="font-semibold text-lg">
                  {b.title}
                </h2>

                <p className="text-gray-600 text-sm">
                  {b.meta}
                </p>

                {/* Actions */}
                <div className="flex gap-3 mt-3">

                  {/* View */}
                  <Link href={`/blog/${b._id}`}>
                    <button className="text-orange-500 border border-orange-500 px-3 py-1 rounded hover:bg-orange-500 hover:text-white">
                      View
                    </button>
                  </Link>

                  {/* Edit */}
                  {session?.user?.email === blog.userEmail && (
  <Link href={`/edit/${blog._id}`}>
    <button>Edit</button>
  </Link>
)}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}