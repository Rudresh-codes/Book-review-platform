import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./src/config/db.js";
import Book from "./src/models/Book.js";

const books = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    description: "Classic software engineering guide with timeless principles."
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A handbook of agile software craftsmanship."
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    description: "Elements of reusable object-oriented software."
  }
];

const seed = async () => {
  try {
    await connectDB();
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log("✅ Books seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

seed();
