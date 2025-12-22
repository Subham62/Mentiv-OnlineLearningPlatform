import express from "express";
import {
  applyToBeInstructor,
  getInstructorStatus,
} from "../controllers/instructor.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Apply to become instructor (auto-approved)
router.post("/apply", isAuthenticated, applyToBeInstructor);

// Check if user is instructor
router.get("/status", isAuthenticated, getInstructorStatus);

export default router;