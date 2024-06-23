import express from "express";

import { createNewGuideline, createNewResource, getGuidelineData, getGuidelinesData, getResourceData, getResourcesData, getAllContent } from "../controllers/contentController.js";

const router = express.Router();

router.post("/guideline/new", createNewGuideline);
router.get("/guideline/", getGuidelinesData);
router.get("/guideline/:id", getGuidelineData);
router.post("/resource/new", createNewResource);
router.get("/resource/", getResourcesData);
router.get("/resource/:id", getResourceData);
router.get("/", getAllContent);

export default router;
