// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0lLvapEDYJyRTnWsBuTBMtP4bayba2Eg",
    authDomain: "ai-ethix.firebaseapp.com",
    projectId: "ai-ethix",
    storageBucket: "ai-ethix.appspot.com",
    messagingSenderId: "951508223071",
    appId: "1:951508223071:web:3018ee071f3135debd87ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);

export { app, auth, db, storage };
