// app/components/Footer.js
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiTiktok } from "react-icons/si"

export default function Footer() {
  return (
    <>
    <div className="mt-5 bottom-0 left-0 w-full border-t bg-gray-50 px-6 py-4 flex items-center justify-between text-sm text-gray-600">

      {/* Left */}
      <p>
         2014-2026 MyBlog. All rights reserved.
      </p>

      {/* Right Icons */}
      <div className="flex items-center gap-5 text-lg">

        <FaFacebookF className="cursor-pointer hover:text-orange-500" />
        <FaYoutube className="cursor-pointer hover:text-orange-500" />
        <FaInstagram className="cursor-pointer hover:text-orange-500" />
        <FaXTwitter className="cursor-pointer hover:text-orange-500" />
        <SiTiktok className="cursor-pointer hover:text-orange-500" />

      </div>

    </div>
    </>
  )
}