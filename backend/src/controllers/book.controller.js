import Book from "../models/Book.js";

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().lean();

    // Return all books with review stats already calculated
    res.json(books);
  } catch (err) {
    console.error("Error in getBooks:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get a single book by UUID (with embedded reviews)
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ id }).lean();

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    console.error("Error in getBookById:", err);
    res.status(500).json({ message: err.message });
  }
};

// Add a new book
export const addBook = async (req, res) => {
  try {
    const { title, author, description, genre, publishYear, pages, tags } = req.body;

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      publishYear,
      pages,
      tags,
    });

    res.status(201).json(book);
  } catch (err) {
    console.error("Error in addBook:", err);
    res.status(400).json({ message: err.message });
  }
};

// Add a review to a book
export const addReview = async (req, res) => {
  try {
    const { id } = req.params; // bookId from URL
    const { rating, text } = req.body;
    const userId = req.user.id; // from JWT
    const userName = req.user.name; // from JWT

    const book = await Book.findOne({ id });
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Add review
    book.reviews.push({ userId, userName, rating, text });
    book.updateReviewStats();
    await book.save();

    res.status(201).json(book);
  } catch (err) {
    console.error("Error in addReview:", err);
    res.status(400).json({ message: err.message });
  }
};

// Get reviews for a specific book
export const getReviewsForBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ id }).lean();

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book.reviews);
  } catch (err) {
    console.error("Error in getReviewsForBook:", err);
    res.status(500).json({ message: err.message });
  }
};
