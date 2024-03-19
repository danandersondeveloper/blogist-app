const express = require("express");
const router = express.Router();

const blogController = require("../Controllers/BlogController");


//@route /admin/blog/create

router.post( "/create", (req, res) => {
	blogController.createBlog(req, res); 
});


//@route /admin/blog/update/:id

router.patch("/update/:id", (req, res) => { 
	blogController.updateBlog(req, res);
});


//@route /admin/blogs/delete/:id

router.delete("/delete/", (req, res) => {
	blogController.deleteBlog(req, res);
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