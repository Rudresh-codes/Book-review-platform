
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Book() {
  const { bookid } = useParams();
  const [bookData, setbookData] = useState([])
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const options = { method: 'GET' };

    fetch(`${import.meta.env.VITE_API_URL}/api/books/${bookid}`, options)
      .then(response => response.json())
      .then(response => {
        setbookData([response]);
        setReviews(response.reviews || []);
      })
      .catch(err => console.error(err));
  }, [])

  const book = bookData.find((b) => b.id === bookid);
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: "",
  });

  if (!book) return <div className="p-4 text-red-500">Book not found</div>;

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token){
      alert("Please login to submit a review.");
      setNewReview({ rating: 0, text: "" });
      return;
    }
    if (!newReview.text || newReview.rating === 0) {
      alert("Please fill all fields.");
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
      .catch(err => console.error(err));

    const reviewWithDate = {
      ...newReview,
    };
    setReviews([reviewWithDate, ...reviews]);
    setNewReview({ rating: 0, text: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Book Header */}
      <div
        className={`p-6 rounded-2xl bg-gradient-to-r`}
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
      <div className="mt-6 bg-gray-100 p-6 rounded-xl">
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
                {rev.userName} - ⭐ {rev.rating}
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
