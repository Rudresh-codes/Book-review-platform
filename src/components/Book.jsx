
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Book() {
  const { bookid } = useParams();

  // Sample data (you’d normally fetch this from an API or DB)
  const bookData = [
    {
      id: "1",
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      rating: 4.8,
      reviewCount: 45623,
      genre: "Fiction",
      pages: 400,
      publishYear: 2017,
      description:
        "Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself. Why her? Why now?",
      coverColor: "from-pink-400 to-rose-500",
      tags: ["Romance", "Historical Fiction", "LGBTQ+"],
      reviews: [
        {
          user: "Sarah M.",
          rating: 5,
          text: "Absolutely captivating! One of the best books I've read this year.",
          date: "2024-11-15",
        },
        {
          user: "Mike R.",
          rating: 5,
          text: "The character development is incredible. Evelyn Hugo is unforgettable.",
          date: "2024-10-28",
        },
        {
          user: "Emma L.",
          rating: 4,
          text: "Great storytelling, though the ending felt a bit rushed.",
          date: "2024-12-03",
        },
      ],
    },
  ];

  const book = bookData.find((b) => b.id === bookid);

  const [reviews, setReviews] = useState(book ? book.reviews : []);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 0,
    text: "",
  });

  if (!book) return <div className="p-4 text-red-500">Book not found</div>;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.user || !newReview.text || newReview.rating === 0) {
      alert("Please fill all fields.");
      return;
    }
    const reviewWithDate = {
      ...newReview,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([reviewWithDate, ...reviews]);
    setNewReview({ user: "", rating: 0, text: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Book Header */}
      <div
        className={`p-6 rounded-2xl bg-gradient-to-r ${book.coverColor} text-white`}
      >
        <h1 className="text-4xl font-bold">{book.title}</h1>
        <p className="mt-2 text-xl">by {book.author}</p>
        <p className="mt-2">
          ⭐ {book.rating} ({book.reviewCount} reviews)
        </p>
        <div className="mt-2 flex gap-2">
          {book.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-black/30 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Book Details */}
      <div className="mt-6 bg-gray-100 p-6 rounded-xl text-gray-800">
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>Pages:</strong> {book.pages}
        </p>
        <p>
          <strong>Published:</strong> {book.publishYear}
        </p>
        <p className="mt-4">{book.description}</p>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((rev, i) => (
            <div
              key={i}
              className="mb-4 p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <p className="font-semibold">
                {rev.user} - ⭐ {rev.rating}
              </p>
              <p>{rev.text}</p>
              <p className="text-sm text-gray-500">{rev.date}</p>
            </div>
          ))
        )}
      </div>

      {/* Review Form */}
      <div className="mt-8 bg-white p-6 shadow rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Add a Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={newReview.user}
            onChange={(e) =>
              setNewReview({ ...newReview, user: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: Number(e.target.value) })
            }
            className="w-full p-2 border rounded"
          >
            <option value={0}>Select rating</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Write your review..."
            value={newReview.text}
            onChange={(e) =>
              setNewReview({ ...newReview, text: e.target.value })
            }
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default Book;
