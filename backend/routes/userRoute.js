import express from "express";

import { createNewUser, getUserData, getUsersData, updateUserData } from "../controllers/userController.js";

const router = express.Router();

//CREATE NEW USER
router.post("/signup", createNewUser);
router.post("/update/:id", updateUserData);
router.get("/:id", getUserData);
router.get("/", getUsersData);

export default router;
