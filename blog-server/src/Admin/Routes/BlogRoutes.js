const express = require("express");
const router = express.Router();

const blogController = require("../Controllers/BlogController");


//@route /admin/blog/create

router.post( "/create", (req, res) => {
	blogController.createBlog(req, res); 
});


//@route /admin/blog/update/:id

router.patch("/update/:id", (req, res) => { 
	res.json({message: "Request made to update / edit a blog"})
});


//@route /admin/blogs/delete/:id

router.delete("/delete/:id", (req, res) => {
	res.json({ message: "Request made to delete a specific blog" })
});


//@route /admin/blogs/:id

router.get('/:id', (req, res) => {
	blogController.getBlog(req, res);
});


//@route /admin/blogs

router.get("/", (req, res) => {
	blogController.getBlogs(req, res)
});

module.exports = router;