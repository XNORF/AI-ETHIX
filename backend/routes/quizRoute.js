import express from "express";

import { createNewQuiz, getQuizData, getQuizzesData, deleteQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.post("/new", createNewQuiz);
router.get("/", getQuizzesData);
router.get("/:id", getQuizData);
router.delete("/:id", deleteQuiz);

export default router;
