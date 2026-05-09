// /app/(main)/layout.js

import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}
