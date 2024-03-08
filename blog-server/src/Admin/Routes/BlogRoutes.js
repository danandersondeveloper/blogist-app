const express = require("express");
const router = express.Router();

const blogController = require("../Controllers/BlogController");

router.post( "/create", (req, res) => {
	blogController.createBlog(req, res); 
});

router.patch("/update/:id", (req, res) => { 
	res.json({message: "Request made to update / edit a blog"})
});

router.delete("/delete/:id", (req, res) => {
	res.json({ message: "Request made to delete a specific blog" })
});


router.get('/:id', (req, res) => {
	blogController.getBlog(req, res);
})

router.get("/", (req, res) => {
	blogController.getBlogs(req, res)
});

module.exports = router;