import { Router } from "express";
import { addReview, getReviewsForBook } from "../controllers/review.controller.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();

router.post("/", requireAuth, addReview);
router.get("/:bookId", getReviewsForBook);

export default router;
