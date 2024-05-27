import { db } from "../config/firebase.js";
import { getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc, setDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

export default class User {
    constructor() {}

    createUser(userJSON) {
        const { id, username, email } = userJSON;
        setDoc(doc(db, "users", id), {
            id: id,
            username: username,
            email: email,
            type: "user",
        });
    }

    //GET ONE USER
    async getUser(id) {
        return await getDoc(doc(db, "users", id));
    }

    //GET ALL USER
    async getUsers() {
        const docs = [];
        let snapshot = await getDocs(collection(db, "users"));
        snapshot.forEach((doc) => {
            docs.push(doc.data());
        });
        return docs;
    }

    updateUser(id, userJSON) {}
}
