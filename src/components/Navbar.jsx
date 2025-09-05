import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            {/* <Book className="w-6 h-6 text-white" /> */}
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">BookVerse</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-purple-300 transition-colors">Discover</a>
          <a href="#" className="hover:text-purple-300 transition-colors">Reviews</a>
          <a href="#" className="hover:text-purple-300 transition-colors">Community</a>
          <a href="#" className="hover:text-purple-300 transition-colors">About</a>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-purple-300 hover:text-white transition-colors">Sign In</button>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition-transform">Join Free</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
