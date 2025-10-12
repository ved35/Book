import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import {
  createBook,
  getBooks,
  getUserBooks,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/", protectRoute, createBook);
router.get("/", protectRoute, getBooks);
router.get("/user", protectRoute, getUserBooks);
router.delete("/:id", protectRoute, deleteBook);

export default router;
