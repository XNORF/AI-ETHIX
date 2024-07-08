import express from "express";

import { createNewGuideline, createNewResource, getGuidelineData, getGuidelinesData, getResourceData, getResourcesData, getAllContent, updateResourceData, updateGuidelineData, deleteContent } from "../controllers/contentController.js";

const router = express.Router();

router.post("/guideline/new", createNewGuideline);
router.get("/guideline/", getGuidelinesData);
router.get("/guideline/:id", getGuidelineData);
router.put("/guideline/update/:id", updateGuidelineData);
router.post("/resource/new", createNewResource);
router.get("/resource/", getResourcesData);
router.get("/resource/:id", getResourceData);
router.put("/resource/update/:id", updateResourceData);
router.get("/", getAllContent);
router.get("/:id", getResourceData);
router.delete("/delete/:id", deleteContent);

export default router;
