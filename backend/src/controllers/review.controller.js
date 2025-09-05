import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const review = await Review.findOneAndUpdate(
      { bookId, userId: req.user.id },
      { rating, comment },
      { upsert: true, new: true, runValidators: true }
    );
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getReviewsForBook = async (req, res) => {
  const reviews = await Review.find({ bookId: req.params.bookId }).populate("userId", "name");
  res.json(reviews);
};