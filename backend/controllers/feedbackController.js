import Feedback from "../models/Feedback.js";
const createNewFeedback = async (req, res) => {
    const feedbackJSON = req.body;
    try {
        const feedback = new Feedback();
        feedback.createFeedback(feedbackJSON);
        res.status(200).json({ msg: "Feedback has been added" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
const getFeedbackData = async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = new Feedback();
        const feedbackData = (await feedback.getFeedback(id)).data();
        if (!feedbackData) {
            res.status(404).json({ msg: "Feedback not found" });
        } else {
            res.status(200).json(feedbackData);
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const getFeedbacksData = async (req, res) => {
    try {
        const feedback = new Feedback();
        const feedbacksData = await feedback.getFeedbacks();
        if (!feedbacksData) {
            res.status(404).json({ msg: "No feedbacks found" });
        } else {
            res.status(200).json(feedbacksData);
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
export { createNewFeedback, getFeedbackData, getFeedbacksData };
