import express from "express";

import { createNewUser, getUserData, getUsersData } from "../controllers/userController.js";

const router = express.Router();

//CREATE NEW USER
router.post("/signup", createNewUser);
router.get("/:id", getUserData);
router.get("/", getUsersData);

export default router;
