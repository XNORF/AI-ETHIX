import { db } from "../config/firebase.js";
import { getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc, setDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

export default class Feedback {
    constructor() {}

    async createFeedback(feedbackJSON) {
        const { username, userID, feedback } = feedbackJSON;
        const date = new Date();
        await addDoc(collection(db, "feedbacks"), {
            feedback: feedback,
            userID: userID,
            username: username,
            datetime: date.toLocaleString(),
        });
    }

    //GET ONE
    async getFeedback(id) {
        return await getDoc(doc(db, "feedbacks", id));
    }

    //GET ALL
    async getFeedbacks() {
        const docs = [];
        let snapshot = await getDocs(collection(db, "feedbacks"));
        snapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        return docs;
    }
}
