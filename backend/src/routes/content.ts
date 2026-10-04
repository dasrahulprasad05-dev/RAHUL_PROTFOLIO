import { Router } from "express";
import {
  getAllSkills, createSkill, updateSkill, deleteSkill,
  getAllEducation, createEducation, updateEducation, deleteEducation,
  getAllAchievements, createAchievement, updateAchievement, deleteAchievement,
  getAllExperience, createExperience, updateExperience, deleteExperience,
} from "../controllers/dataController.js";
import {
  createMessage, getAllMessages, updateMessageStatus, deleteMessage,
  getTimeline, createTimelineEvent, updateTimelineEvent, deleteTimelineEvent,
  getBuildLogs, getAllBuildLogs, createBuildLog, updateBuildLog, deleteBuildLog,
  getSocialLinks, upsertSocialLink, deleteSocialLink,
  getSettings, updateSettings,
  trackPageView, getAnalytics,
} from "../controllers/contentController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// ─── Skills ───────────────────────────────────────────────
router.get("/skills", getAllSkills);
router.post("/skills", authMiddleware, createSkill);
router.put("/skills/:id", authMiddleware, updateSkill);
router.delete("/skills/:id", authMiddleware, deleteSkill);

// ─── Education ────────────────────────────────────────────
router.get("/education", getAllEducation);
router.post("/education", authMiddleware, createEducation);
router.put("/education/:id", authMiddleware, updateEducation);
router.delete("/education/:id", authMiddleware, deleteEducation);

// ─── Achievements ─────────────────────────────────────────
router.get("/achievements", getAllAchievements);
router.post("/achievements", authMiddleware, createAchievement);
router.put("/achievements/:id", authMiddleware, updateAchievement);
router.delete("/achievements/:id", authMiddleware, deleteAchievement);

// ─── Experience ───────────────────────────────────────────
router.get("/experience", getAllExperience);
router.post("/experience", authMiddleware, createExperience);
router.put("/experience/:id", authMiddleware, updateExperience);
router.delete("/experience/:id", authMiddleware, deleteExperience);

// ─── Messages ─────────────────────────────────────────────
router.post("/messages", createMessage); // Public — contact form
router.get("/messages", authMiddleware, getAllMessages);
router.put("/messages/:id", authMiddleware, updateMessageStatus);
router.delete("/messages/:id", authMiddleware, deleteMessage);

// ─── Timeline / Journey ───────────────────────────────────
router.get("/timeline", getTimeline);
router.post("/timeline", authMiddleware, createTimelineEvent);
router.put("/timeline/:id", authMiddleware, updateTimelineEvent);
router.delete("/timeline/:id", authMiddleware, deleteTimelineEvent);

// ─── Build Log ────────────────────────────────────────────
router.get("/build-log", getBuildLogs); // Public — published only
router.get("/build-log/all", authMiddleware, getAllBuildLogs);
router.post("/build-log", authMiddleware, createBuildLog);
router.put("/build-log/:id", authMiddleware, updateBuildLog);
router.delete("/build-log/:id", authMiddleware, deleteBuildLog);

// ─── Social Links ─────────────────────────────────────────
router.get("/social-links", getSocialLinks);
router.post("/social-links", authMiddleware, upsertSocialLink);
router.delete("/social-links/:id", authMiddleware, deleteSocialLink);

// ─── Site Settings ────────────────────────────────────────
router.get("/settings", getSettings);
router.put("/settings", authMiddleware, updateSettings);

// ─── Analytics ────────────────────────────────────────────
router.post("/analytics/track", trackPageView); // Public
router.get("/analytics", authMiddleware, getAnalytics);

export default router;
