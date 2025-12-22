import express from "express";
const router = express.Router();
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse, totalCourses } from "../controllers/course.controller.js";
import upload from "../utils/multer.js"

router.route("/").post(isAuthenticated, createCourse);
// router.route("/published-courses").get(isAuthenticated, getPublishedCourse);
router.route("/published-courses").get( getPublishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
// search course
router.route("/search").get(isAuthenticated, searchCourse);

router.route("/totalCourses").get(totalCourses);

router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);


export default router;

// Express matches routes in order, so if /course/:id is defined before /course/search, it catches "search" as :id, which is your current issue.
// -----------------------------
// Express automatically parses this part:
// ?query=react&categories=html,css&sortByPrice=low


// And gives you:

// req.query = {
//   query: "react",
//   categories: "html,css",
//   sortByPrice: "low"
// }


// Even though your route is only /search, Express matches the path before the ?, and puts everything after ? into req.query.