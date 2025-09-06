import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null); // store full user object

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ use localStorage instead of hardcoding
    if (!token) return; // not logged in

    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.name) {
          setUser(data);
        }
      })
      .catch(err => console.error("Error fetching user:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    setUser(null);
    window.location.href = "/"; // refresh or redirect
  };

  return (
    <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          {/* Could put an icon here */}
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          BookVerse
        </span>
      </div>

      {/* Navigation links */}
      <div className="hidden md:flex space-x-8">
        <a href="/books" className="hover:text-purple-300 transition-colors">Discover</a>
        <a href="/reviews" className="hover:text-purple-300 transition-colors">Reviews</a>
        <a href="/community" className="hover:text-purple-300 transition-colors">Community</a>
        <a href="/about" className="hover:text-purple-300 transition-colors">About</a>
      </div>

      {/* Right side */}
      <div className="flex space-x-4">
        {user ? (
          <>
            <span className="text-purple-300 font-medium justify-center item-center">Welcome {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a
              href="/login"
              className="px-4 py-2 text-purple-300 hover:text-white transition-colors"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition-transform text-white"
            >
              Join Free
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
