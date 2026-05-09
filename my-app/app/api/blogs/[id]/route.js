import dbConnect from "@/lib/mongodb"
import Blog from "@/models/Blog"

export async function GET(req, { params }) {

  await dbConnect()

  const blog = await Blog.findById(params.id)

  return Response.json(blog)
}

export async function PUT(req, { params }) {

  await dbConnect()

  const body = await req.json()

  const updatedBlog = await Blog.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  )

  return Response.json(updatedBlog)
}

export async function DELETE(req, { params }) {

  await dbConnect()

  await Blog.findByIdAndDelete(params.id)

  return Response.json({
    message: "Blog deleted",
  })
}