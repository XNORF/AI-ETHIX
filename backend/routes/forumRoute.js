import express from "express";

import { createNewPost, getPostData, getPostsData, updatePostData, deletePost } from "../controllers/forumController.js";

const router = express.Router();

//CREATE NEW USER
router.post("/new", createNewPost);
router.get("/:id", getPostData);
router.get("/", getPostsData);

export default router;
