import dbConnect from "@/lib/mongodb"
import Blog from "@/models/Blog"

export async function GET() {
  await dbConnect()

  const blogs = await Blog.find().sort({
    createdAt: -1,
  })

  return Response.json(blogs)
}

export async function POST(req) {
  await dbConnect()

  const body = await req.json()

  const blog = await Blog.create(body)

  return Response.json(blog)
}