import { Router } from "express";
import { getChatLogs, deleteChatLog } from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// GET /api/admin/chat-logs (paginated)
router.get("/", authMiddleware, getChatLogs);

// DELETE /api/admin/chat-logs/:id
router.delete("/:id", authMiddleware, deleteChatLog);

export default router;
