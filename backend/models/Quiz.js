import { db } from "../config/firebase.js";
import { getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc, setDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

export default class Quiz {
    constructor() {}
    async createQuiz(quizJSON) {
        await addDoc(collection(db, "quizzes"), {
            questions: quizJSON,
        });
    }
    async getQuiz(id) {
        return await getDoc(doc(db, "quizzes", id));
    }
    async getQuizzes() {
        const docs = [];
        let snapshot = await getDocs(collection(db, "quizzes"));
        snapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        return docs;
    }
    async deleteQuiz(id) {
        await deleteDoc(doc(db, "quizzes", id));
    }
}
