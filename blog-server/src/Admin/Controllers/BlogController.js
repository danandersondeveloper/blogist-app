// Data model 
const Blog = require("../../Models/BlogModel");

const createBlog = async (req, res) => {
	try {

		await Blog.create(req.body)

		res.status(200).json({ message: "success" })

	} catch(error) {
		console.log(error);
		res.status(500).json({ message: "Status Code 500: Internal Server Error." });
	}
}

const getBlog = async (req, res) => {
	try {

		const blogId = req.params.id
		const blog = await Blog.findById(blogId);
		return res.status(200).json(blog);

	} catch(error) {
		console.log(error);
		res.status(500).json({ message: "Status Code 500: Internal Server Error." });
	}
}

const getBlogs = async (req, res) => {
	try {

		const removedData = [
			"-picture",
			"-content",
			"-shortDescription",
			"-__v"
		]

		const blogs = await Blog.find().select(removedData);
		
		res.status(200);
		res.json(blogs);

	} catch(error) {

		console.log(error);
		res.status(500).json({ message: "Status Code 500: Internal Server Error." });

	}
}

module.exports = {
	createBlog,
	getBlog,
	getBlogs
}