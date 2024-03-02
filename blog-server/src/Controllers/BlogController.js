// Data model 
const Blog = require("../Models/BlogModel");

const getBlog = async (req, res) => {
	try {

		const blogId = req.params.id
		const blog = await Blog.findById(blogId);
		res.status(200).json(blog);
		
	} catch(error) {

		res.status(500).json({ message: "Status Code 500: Internal Server Error." });

	}
}

const getBlogs = async (req, res) => {
	try {

		const removedData = [
			"-content",
			"-__v"
		]

		const blogs = await Blog.find().select(removedData);
		
		res.status(200);
		res.json(blogs);

	} catch(error) {

		res.status(500).json({ message: "Status Code 500: Internal Server Error." });

	}
}

module.exports = {
	getBlog,
	getBlogs
}
