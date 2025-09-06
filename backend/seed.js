import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./src/config/db.js";
import Book from "./src/models/Book.js";
import User from "./src/models/User.js";

const seed = async () => {
  try {
    await connectDB();

    // Clear old data
    await User.deleteMany();
    await Book.deleteMany();

    // Create sample users
    const users = await User.insertMany([
      { name: "Admin", email: "admin@example.com", password: "admin123", isAdmin: true },
      { name: "Sarah M.", email: "sarah@example.com", password: "password123" },
      { name: "Mike R.", email: "mike@example.com", password: "password123" },
      { name: "Emma L.", email: "emma@example.com", password: "password123" }
    ]);

    console.log("✅ Users seeded");

    // Sample books with embedded reviews
    const books = [
      {
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        description:
          "Hollywood icon Evelyn Hugo tells the story of her scandalous life.",
        genre: "Fiction",
        publishYear: 2017,
        pages: 400,
        tags: ["Romance", "Historical Fiction", "LGBTQ+"],
        reviews: [
          {
            userId: users[1].id,
            userName: users[1].name,
            rating: 5,
            text: "Absolutely captivating!"
          },
          {
            userId: users[2].id,
            userName: users[2].name,
            rating: 5,
            text: "Unforgettable."
          },
          {
            userId: users[3].id,
            userName: users[3].name,
            rating: 4,
            text: "Great storytelling."
          }
        ]
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        description: "A handbook of agile software craftsmanship.",
        genre: "Programming",
        publishYear: 2008,
        pages: 464,
        tags: ["Software", "Best Practices"],
        reviews: [
          {
            userId: users[1].id,
            userName: users[1].name,
            rating: 5,
            text: "Must-read for devs."
          },
          {
            userId: users[2].id,
            userName: users[2].name,
            rating: 4,
            text: "Dense but worth it."
          }
        ]
      }
    ];

    // Insert books with updated stats
    for (const bookData of books) {
      const book = new Book(bookData);
      book.updateReviewStats();
      await book.save();
    }

    console.log("✅ Books seeded with reviews");

  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    mongoose.connection.close();
  }
};

seed();