import { Router } from "express";
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectsController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// Public
router.get("/", getAllProjects);
router.get("/:slug", getProjectBySlug);

// Admin
router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
