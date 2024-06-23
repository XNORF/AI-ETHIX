import "dotenv/config";
import { db } from "../config/firebase.js";
import { getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc, setDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

export default class Chat {
    constructor() {}

    async sendQuery(query) {
        return await addDoc(collection(db, "_firestore-vector-search-ughz/index/queries"), {
            query: query,
        });
    }

    async getData(id) {
        return await getDoc(doc(db, "_firestore-vector-search-ughz/index/queries", id));
    }

    async getContents(id) {
        return await getDoc(doc(db, "contents", id));
    }

    async chat(query, filteredData) {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            max_tokens: 150,
            messages: [
                {
                    role: "system",
                    content:
                        `You are an intelligent, cheerful assistant for a website called "AI-Ethix" which contains guidelines and resources to using and developing ethical artificial intelligence, you are designed to provide help and answers to user questions using only the following data:
                    
                    ---` +
                        JSON.stringify(filteredData) +
                        `---
                    Do include the link to the source of the data when necessary. If you do not know the answer, say 'I don't know'. Do not use any data besides what is in this prompt to answer any questions. Limit your answer to 100 words max.`,
                },
                ...query,
            ],
        });
        return chatCompletion;
    }
}
