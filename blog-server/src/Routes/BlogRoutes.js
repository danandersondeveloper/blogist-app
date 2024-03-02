const express = require("express");
const router = express.Router()

// Controller imports
const blogController = require("../Controllers/BlogController");

router.get("/", (req, res) => {
	blogController.getBlogs(req, res)
});

module.exports = router;