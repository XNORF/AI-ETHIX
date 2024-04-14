const express = require("express");
const { getAll, getSingle } = require("../controllers/testController");

const router = express.Router();

//GET ALL
router.get("/", getAll);

//GET SINGLE
router.get("/:id", getSingle);

module.exports = router;
