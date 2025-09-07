import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Book as BookIcon, Calendar, FileText, User, MessageCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Loader Component
const BookLoader = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20">
          <div className="h-10 bg-white/20 rounded-lg mb-4"></div>
          <div className="h-6 bg-white/20 rounded-lg mb-2 w-3/4"></div>
          <div className="h-5 bg-white/20 rounded-lg mb-4 w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-white/20 rounded-full"></div>
            <div className="h-8 w-24 bg-white/20 rounded-full"></div>
            <div className="h-8 w-16 bg-white/20 rounded-full"></div>
          </div>
        </div>

        {/* Details skeleton */}
        <div className="mt-6 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl">
          <div className="space-y-3">
            <div className="h-5 bg-white/20 rounded w-1/4"></div>
            <div className="h-5 bg-white/20 rounded w-1/3"></div>
            <div className="h-5 bg-white/20 rounded w-1/4"></div>
            <div className="h-20 bg-white/20 rounded mt-4"></div>
          </div>
        </div>

        {/* Reviews skeleton */}
        <div className="mt-8">
          <div className="h-8 bg-white/20 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl">
                <div className="h-5 bg-white/20 rounded w-1/3 mb-2"></div>
                <div className="h-16 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function Book() {
  const { bookid } = useParams();
  const [bookData, setbookData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const options = { method: 'GET' };
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/books/${bookid}`, options)
      .then(response => response.json())
      .then(response => {
        setbookData([response]);
        setReviews(response.reviews || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [bookid]);

  const book = bookData.find((b) => b.id === bookid);
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: "",
  });

  if (loading) return <BookLoader />;
  if (!book) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center py-20">
        <BookIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-400 mb-2">Book Not Found</h2>
        <p className="text-gray-300">The book you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setSubmittingReview(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to submit a review.");
      setNewReview({ rating: 0, text: "" });
      setSubmittingReview(false);
      return;
    }
    if (!newReview.text || newReview.rating === 0) {
      alert("Please fill all fields.");
      setSubmittingReview(false);
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: newReview ? JSON.stringify(newReview) : null
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/books/${bookid}/review`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err))
      .finally(() => setSubmittingReview(false));
      alert("Review submitted successfully!");
    
      // reload page
      setNewReview({ rating: 0, text: "" });
      window.location.reload();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Book Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-white/20">
        <div className="flex items-start gap-6">
          <div className="w-24 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
            <BookIcon className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">{book.title}</h1>
            <p className="text-xl text-gray-200 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" />
              by {book.author}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(Math.floor(book.rating))}
              </div>
              <span className="text-white font-semibold">{book.rating}</span>
              <span className="text-gray-300">({book.reviewCount} reviews)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {book.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm bg-white/20 backdrop-blur-lg rounded-full border border-white/30 text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Book Details */}
      <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Book Details</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <BookIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Genre</p>
              <p className="text-white font-semibold">{book.genre}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Pages</p>
              <p className="text-white font-semibold">{book.pages}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Published</p>
              <p className="text-white font-semibold">{book.publishYear}</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-white/20">
          <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
          <p className="text-gray-200 leading-relaxed">{book.description}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-purple-400" />
          <h2 className="text-3xl font-bold text-white">Reviews</h2>
        </div>
        
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-300">No reviews yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white">
                      {rev.userName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{rev.userName || 'Anonymous'}</p>
                      <div className="flex items-center gap-1">
                        {renderStars(rev.rating)}
                      </div>
                    </div>
                  </div>
                  {rev.date && (
                    <span className="text-sm text-gray-400">{rev.date}</span>
                  )}
                </div>
                <p className="text-gray-200 leading-relaxed">{rev.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Form */}
      <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Send className="w-6 h-6 text-purple-400" />
          Add Your Review
        </h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-2">Rating</label>
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
              className="w-full p-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            >
              <option value={0}>Select rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r} className="bg-gray-800">
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Your Review</label>
            <textarea
              placeholder="Share your thoughts about this book..."
              value={newReview.text}
              onChange={(e) =>
                setNewReview({ ...newReview, text: e.target.value })
              }
              rows="4"
              className="w-full p-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submittingReview}
            className="group px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            {submittingReview ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Book;