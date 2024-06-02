import Quiz from "../models/Quiz.js";
const createNewQuiz = async (req, res) => {
    const quizJSON = req.body;
    try {
        const quiz = new Quiz();
        quiz.createQuiz(quizJSON);
        res.status(200).json({ msg: "New quiz has been added" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
const getQuizData = async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = new Quiz();
        const quizData = (await quiz.getQuiz(id)).data();
        if (!quizData) {
            res.status(404).json({ msg: "Quiz not found" });
        } else {
            res.status(200).json(quizData);
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const getQuizzesData = async (req, res) => {
    try {
        const quiz = new Quiz();
        const quizzesData = await quiz.getQuizzes();
        if (!quizzesData) {
            res.status(404).json({ msg: "No quizzes found" });
        } else {
            res.status(200).json({ quizzesData });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
export { createNewQuiz, getQuizData, getQuizzesData };
