import { db } from "../config/firebase.js";
import { getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc, setDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

export default class Guideline {
    constructor() {}
    async createGuideline(guidelineJSON) {
        let { username, userID, title, content, source, author, banner } = guidelineJSON;
        const date = new Date();
        if (banner == "") {
            banner = `https://media.istockphoto.com/id/1209490694/vector/valid-document-line-icon-approved-document-vector-illustration-isolated-on-white-note-with.jpg?s=612x612&w=0&k=20&c=LCxMwSIY-lo50okCzf8Z7mDqPsl__yxs3Gkr0sAh37Y=`;
        }
        await addDoc(collection(db, "contents"), {
            author: author,
            title: title,
            content: content,
            userID: userID,
            username: username,
            source: source,
            banner: banner,
            datetime: date.toLocaleString(),
            type: "guideline",
        });
    }
    async getGuideline(id) {
        return await getDoc(doc(db, "contents", id));
    }
    async getGuidelines() {
        const docs = [];
        let snapshot = await getDocs(query(collection(db, "contents"), where("type", "==", "guideline")));
        snapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        return docs;
    }
    async getContents() {
        const docs = [];
        let snapshot = await getDocs(query(collection(db, "contents")));
        snapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        return docs;
    }
    async updateGuideline(id, guidelineJSON) {
        const date = new Date();
        await updateDoc(doc(db, "contents", id), {
            ...guidelineJSON,
            datetime: date.toLocaleString(),
            type: "guideline",
        });
    }
    async deleteContent(id) {
        await deleteDoc(doc(db, "contents", id));
    }
}
