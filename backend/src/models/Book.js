import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const reviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },    // links to User.id
  rating: { type: Number, min: 1, max: 5, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { _id: false });

const bookSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, // UUID
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  genre: String,
  publishYear: Number,
  pages: Number,
  tags: [String],
  reviews: [reviewSchema],
  reviewCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 } // average rating
}, { timestamps: true });

// Auto-update reviewCount & avg rating
bookSchema.methods.updateReviewStats = function () {
  this.reviewCount = this.reviews.length;
  if (this.reviews.length > 0) {
    this.rating = this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length;
  } else {
    this.rating = 0;
  }
};

export default mongoose.model("Book", bookSchema);
