"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"


export default function BlogPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [index, setIndex] = useState(0)
  const { data: session } = useSession()

  const [allBlogs, setAllBlogs] = useState([])

  const recommendations = allBlogs
  .filter((b) => b.id != id)
  .slice(0, 4)

 
  useEffect(() => {

    const fetchBlog = async () => {
  
      const res = await fetch(`/api/blogs/${id}`)
  
      const data = await res.json()
  
      setBlog(data)
    }
  
    fetchBlog()
  
  }, [id])

  if (!blog) return <p>Loading...</p>

  const next = () => {
    setIndex((prev) => (prev + 1) % blog.images.length)
  }

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? blog.images.length - 1 : prev - 1
    )
  }

  return (
    <>

<div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">


    <div className="p-8 max-w-3xl mx-auto md:col-span-2">
      <div className="mt-4 mb-4 flex gap-2">
        {blog.tags.map((t, i) => (
          <span key={i} className="bg-orange-100 px-2 py-1 text-sm rounded">
            {t}
          </span>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

     {/* IMAGE SLIDER */}
     <div className="relative mb-6">

<img
  src={blog.images[index]}
  className="w-full h-80 object-cover rounded"
/>

{/* Left Button */}
<button
  onClick={prev}
  className="absolute left-2 top-1/2 -translate-y-1/2  text-white px-3 py-1 rounded-full hover:cursor-pointer"
>
  ◀
</button>

{/* Right Button */}
<button
  onClick={next}
  className="absolute right-2 top-1/2 -translate-y-1/2  text-white px-3 py-1 rounded-full hover:cursor-pointer"
>
  ▶
</button>

</div>

      <p className="whitespace-pre-line">{blog.content}</p>

    </div>


    <div>

  <h2 className="text-lg font-semibold mb-4 border-b pb-2">
    Recommended for you
  </h2>

  <div className="flex flex-col gap-4">

    {recommendations.map((item) => (
      <div
        key={item.id}
        className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
        onClick={() => window.location.href = `/blog/${item._id}`}
      >

        {/* Image */}
        <img
          src={item.images?.[0]}
          className="w-20 h-16 object-cover rounded"
        />

        {/* Text */}
        <div>
          <p className="text-sm font-medium line-clamp-2">
            {item.title}
          </p>

          <p className="text-xs text-gray-500">
            {new Date(item._id).toDateString()}
          </p>
        </div>

      </div>
    ))}

  </div>

</div>

    </div>
    </>
  )
}