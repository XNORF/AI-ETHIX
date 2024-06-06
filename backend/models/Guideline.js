import { db } from "../config/firebase.js";
import { getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc, setDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

export default class Guideline {
    constructor() {}
    async createGuideline(guidelineJSON) {
        const { username, userID, title, content, source, author, banner } = guidelineJSON;
        const date = new Date();
        await addDoc(collection(db, "guidelines"), {
            author: author,
            title: title,
            content: content,
            userID: userID,
            username: username,
            source: source,
            banner: banner,
            datetime: date.toLocaleString(),
        });
    }
    async getGuideline(id) {
        return await getDoc(doc(db, "guidelines", id));
    }
    async getGuidelines() {
        const docs = [];
        let snapshot = await getDocs(collection(db, "guidelines"));
        snapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        return docs;
    }
    async updateGuideline(id, guidelineJSON) {}
    async deleteGuideline(id) {}
}
