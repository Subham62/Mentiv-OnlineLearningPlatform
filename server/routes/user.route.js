import express from "express";
const router = express.Router();
import {
  register,
  login,
  getUserProfile,
  logout,
  updateProfile,
  forgotPasswordCode,
  resetPassword,
  changePassword,
  getTotalStudents,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router
  .route("/profile/update")
  .put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

// New password reset routes
router.route("/forgot-password").post(forgotPasswordCode);
router.route("/reset-password").post(resetPassword);
router.route("/change-password").put(isAuthenticated, changePassword);
router.route("/totalStudents").get(getTotalStudents);

export default router;