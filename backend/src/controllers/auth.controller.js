import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helper: create JWT using UUID
const generateToken = (user) =>
  jwt.sign(
    { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // check existing
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user (accept isAdmin if provided)
    const user = await User.create({
      name,
      email,
      password,
      isAdmin: isAdmin === true // default false if not provided
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(400).json({ message: err.message });
  }
};


// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({ token });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get profile (optional)
export const me = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.id }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
