import { db } from "../config/firebase.js";
import { getDoc, getDocs, addDoc, deleteDoc, updateDoc, setDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";

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
    async getUser(userID) {
        return await getDoc(doc(db, "users", userID));
    }

    //GET ALL USER
    getUsers() {}

    updateUser(userID, userJSON) {}

    deleteUser(userID) {}
}
