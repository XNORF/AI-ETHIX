import express from "express";

import { createNewUser, getUserData } from "../controllers/userController.js";

const router = express.Router();

//CREATE NEW USER
router.post("/signup", createNewUser);
router.get("/:id", getUserData);

export default router;
