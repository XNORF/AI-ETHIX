import { db } from "../config/firebase.js";
import { getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc, setDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

export default class Post {
    constructor() {}
    async createPost(postJSON) {
        const { forumID, userID, username, title, content, attachment } = postJSON;
        const date = new Date();
        await addDoc(collection(db, "posts"), {
            forumID: forumID,
            title: title,
            content: content,
            userID: userID,
            username: username,
            attachment: attachment,
            datetime: date.toLocaleString(),
        });
    }

    async getPost(id) {
        return await getDoc(doc(db, "posts", id));
    }

    async getPosts() {
        const docs = [];
        let snapshot = await getDocs(query(collection(db, "posts"), where("forumID", "==", "")));
        snapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        return docs;
    }
    async getComments(id) {
        const docs = [];
        let snapshot = await getDocs(query(collection(db, "posts"), where("forumID", "==", id)));
        snapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        return docs;
    }
    async updatePost(id, postJSON) {}
    async deletePost(id) {}
}