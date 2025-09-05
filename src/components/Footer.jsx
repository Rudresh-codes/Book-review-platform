
const Footer = () => {
  return (
    <div>
            {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                {/* <Book className="w-5 h-5 text-white" /> */}
              </div>
              <span className="text-xl font-bold">BookVerse</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting readers with their perfect books through community and technology.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div>Discover Books</div>
              <div>Write Reviews</div>
              <div>Join Discussions</div>
              <div>Reading Lists</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div>Book Clubs</div>
              <div>Reading Challenges</div>
              <div>Author Events</div>
              <div>Reader Awards</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div>Help Center</div>
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
              <div>Contact Us</div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          © 2025 BookVerse. Made with ❤️ for book lovers everywhere.
        </div>
      </footer>
    </div>
  )
}

export default Footer
