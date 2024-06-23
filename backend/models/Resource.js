import { db } from "../config/firebase.js";
import { getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc, setDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

export default class Resource {
    constructor() {}
    async createResource(resourceJSON) {
        const { username, userID, title, content, source, author, banner } = resourceJSON;
        const date = new Date();
        await addDoc(collection(db, "contents"), {
            author: author,
            title: title,
            content: content,
            userID: userID,
            username: username,
            source: source,
            banner: banner,
            datetime: date.toLocaleString(),
            type: "resource",
        });
    }
    async getResource(id) {
        return await getDoc(doc(db, "contents", id));
    }
    async getResources() {
        const docs = [];
        let snapshot = await getDocs(query(collection(db, "contents"), where("type", "==", "resource")));
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
    async updateResource(id, resourceJSON) {}
    async deleteResource(id) {}
}
