import { db } from "../config/firebase.js";
import { getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc, setDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

export default class Resource {
    constructor() {}
    async createResource(resourceJSON) {
        const { userID, title, content, source, author, banner } = resourceJSON;
        const date = new Date();
        await addDoc(collection(db, "resources"), {
            author: author,
            title: title,
            content: content,
            userID: userID,
            source: source,
            banner: banner,
            datetime: date.toLocaleString(),
        });
    }
    async getResource(id) {
        return await getDoc(doc(db, "resources", id));
    }
    async getResources() {
        const docs = [];
        let snapshot = await getDocs(collection(db, "resources"));
        snapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        return docs;
    }
    async updateResource(id, resourceJSON) {}
    async deleteResource(id) {}
}
