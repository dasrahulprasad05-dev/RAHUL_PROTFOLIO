import { Router } from "express";
import rateLimit from "express-rate-limit";
import { handleChat } from "../controllers/chatController.js";

const router = Router();

// Dedicated rate limiter for AI chat: 20 requests per hour per IP
const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many chat requests from this IP. Please try again in an hour.",
  },
});

router.post("/", chatLimiter, handleChat);

export default router;
