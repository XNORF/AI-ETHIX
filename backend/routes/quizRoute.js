import express from "express";

import { createNewQuiz, getQuizData, getQuizzesData } from "../controllers/quizController.js";

const router = express.Router();

router.post("/new", createNewQuiz);
router.get("/", getQuizzesData);
router.get("/:id", getQuizData);

export default router;
