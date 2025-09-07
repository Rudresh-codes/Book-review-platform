import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Plus, Save, X } from 'lucide-react';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishYear: '',
    pages: '',
    tags: []
  });
  
  const [currentTag, setCurrentTag] = useState('');

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 
    'Biography', 'History', 'Programming', 'Business', 'Self-Help', 
    'Poetry', 'Drama', 'Adventure', 'Horror', 'Thriller'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to add a book.");
    navigate("/login");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // ✅ send JWT
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add book");
    }

    console.log("Book added:", data);
    alert("Book added successfully!");

    // Optional: reset form
    setFormData({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishYear: '',
    pages: '',
    tags: []
  });

    // Redirect back to books page
    navigate("/books");

  } catch (err) {
    console.error("Add book error:", err);
    alert(err.message);
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Add New Book</h1>
        <p className="text-gray-300 text-lg">Share a great book with the BookVerse community</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Book Information</h2>
          
          <div>
            <label className="block text-white font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter book title"
              className="w-full p-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter author name"
              className="w-full p-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter book description..."
              rows={4}
              className="w-full p-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">Genre</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              >
                <option value="" className="bg-gray-800">Select a genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre} className="bg-gray-800">
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Publish Year</label>
              <input
                type="number"
                name="publishYear"
                value={formData.publishYear}
                onChange={handleInputChange}
                placeholder="e.g., 2023"
                min="1000"
                max={new Date().getFullYear()}
                className="w-full p-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Pages</label>
              <input
                type="number"
                name="pages"
                value={formData.pages}
                onChange={handleInputChange}
                placeholder="e.g., 350"
                min="1"
                className="w-full p-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Tags</h2>
          
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add a tag..."
              className="flex-1 p-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300"
            >
              Add
            </button>
          </div>

          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-full border border-white/30 text-white flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="w-4 h-4 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <X className="w-full h-full" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={() => navigate('/books')}
            className="px-8 py-3 border-2 border-gray-400 rounded-xl font-semibold text-gray-300 hover:bg-gray-400/10 transition-all duration-300"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;