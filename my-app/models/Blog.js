import mongoose from "mongoose"

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    meta: String,
    content: String,
    images: [String],
    tags: [String],

    userEmail: String,
    userName: String,
    userImage: String,
  },
  { timestamps: true }
)

export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema)