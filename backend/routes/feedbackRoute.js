import express from "express";

import { createNewFeedback, getFeedbackData, getFeedbacksData } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/new", createNewFeedback);
router.get("/:id", getFeedbackData);
router.get("/", getFeedbacksData);

export default router;
