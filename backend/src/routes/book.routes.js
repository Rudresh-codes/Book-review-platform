import { Router } from "express";
import { getBooks, getBookById ,addBook,addReview } from "../controllers/book.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/:id/review", requireAuth, addReview);
router.post("/add", requireAuth, requireAdmin, addBook); // only admin

export default router;
