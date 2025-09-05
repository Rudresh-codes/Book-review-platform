import Book from "../models/Book.js";
import Review from "../models/Review.js";

export const getBooks = async (req, res) => {
  const books = await Book.find();
  const reviews = await Review.aggregate([
    { $group: { _id: "$bookId", avgRating: { $avg: "$rating" } } }
  ]);
  const reviewMap = new Map(reviews.map(r => [r._id.toString(), r.avgRating]));
  const withRatings = books.map(b => ({
    ...b.toObject(),
    avgRating: reviewMap.get(b._id.toString()) || 0,
  }));
  res.json(withRatings);
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Not found" });
  const reviews = await Review.find({ bookId: book._id }).populate("userId", "name");
  res.json({ ...book.toObject(), reviews });
};