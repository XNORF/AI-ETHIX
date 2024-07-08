import Guideline from "../models/Guideline.js";
import Resource from "../models/Resource.js";

const createNewGuideline = async (req, res) => {
    const guidelineJSON = req.body;
    try {
        const guideline = new Guideline();
        guideline.createGuideline(guidelineJSON);
        res.status(200).json({ msg: "Guideline has been added" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const createNewResource = async (req, res) => {
    const resourceJSON = req.body;
    try {
        const resource = new Resource();
        resource.createResource(resourceJSON);
        res.status(200).json({ msg: "Resource has been added" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const getGuidelineData = async (req, res) => {
    const { id } = req.params;
    try {
        const guideline = new Guideline();
        const guidelineData = (await guideline.getGuideline(id)).data();
        if (!guidelineData) {
            res.status(404).json({ msg: "Guideline not found" });
        } else {
            res.status(200).json(guidelineData);
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const getGuidelinesData = async (req, res) => {
    try {
        const guideline = new Guideline();
        const guidelinesData = await guideline.getGuidelines();
        if (!guidelinesData) {
            res.status(404).json({ msg: "No guidelines found" });
        } else {
            res.status(200).json({ guidelinesData });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const getResourceData = async (req, res) => {
    const { id } = req.params;
    try {
        const resource = new Resource();
        const resourceData = (await resource.getResource(id)).data();
        if (!resourceData) {
            res.status(404).json({ msg: "Resource not found" });
        } else {
            res.status(200).json(resourceData);
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const getResourcesData = async (req, res) => {
    try {
        const resource = new Resource();
        const resourcesData = await resource.getResources();
        if (!resourcesData) {
            res.status(404).json({ msg: "No resources found" });
        } else {
            res.status(200).json({ resourcesData });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const getAllContent = async (req, res) => {
    try {
        const content = new Resource();
        const contentsData = await content.getContents();
        if (!contentsData) {
            res.status(404).json({ msg: "No contents found" });
        } else {
            res.status(200).json({ contentsData });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const updateResourceData = async (req, res) => {
    const { id } = req.params;
    const resourceJSON = req.body;
    try {
        const resource = new Resource();
        resource.updateResource(id, resourceJSON);
        res.status(200).json({ msg: "Resource Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const updateGuidelineData = async (req, res) => {
    const { id } = req.params;
    const guidelineJSON = req.body;
    try {
        const guideline = new Guideline();
        guideline.updateGuideline(id, guidelineJSON);
        res.status(200).json({ msg: "Guideline Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

const deleteContent = async (req, res) => {
    const { id } = req.params;
    try {
        const resource = new Resource();
        resource.deleteContent(id);
        res.status(200).json({ msg: "Content deleted successfully." });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
export { createNewGuideline, createNewResource, getGuidelineData, getGuidelinesData, getResourceData, getResourcesData, getAllContent, updateResourceData, updateGuidelineData, deleteContent };
