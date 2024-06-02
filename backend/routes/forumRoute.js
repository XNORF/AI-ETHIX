import express from "express";

import { createNewPost, getPostData, getPostsData, updatePostData, deletePost, uploadAttachment } from "../controllers/forumController.js";

const router = express.Router();

//CREATE NEW USER
router.post("/new", createNewPost);
router.post("/upload", uploadAttachment);
router.get("/:id", getPostData);
router.get("/", getPostsData);

export default router;
