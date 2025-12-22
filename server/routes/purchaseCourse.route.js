import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({type: "application/json"}), stripeWebhook);
// -->  express.raw({type: "application/json"}) no use of this but have to pass it
router.route("/course/:courseId/detail-with-status").get(isAuthenticated ,getCourseDetailWithPurchaseStatus);

router.route("/").get(getAllPurchasedCourse);

export default router;

// NOTE : from isAuthenticated , we can get req.id 