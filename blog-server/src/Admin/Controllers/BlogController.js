// Data model 
const Blog = require("../../Models/BlogModel");


// @desc Delete a blog
// @route DELETE /admin/delete/:id
// @access Private

const deleteBlog = async (res, req) => {
	try {

		console.log(req.body.requestBody);

		// const blogId = req.body.requestBody._id;
		// const userDeleteString = req.body.requestBody.deleteString;

		// if (userDeleteString != "DELETE") return res.status(422).json({ message: "Invalid input, please try again!" });

		// await Blog.findByIdAndDelete(blogId);

		// res.status(200).json({ message: "success" })
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Status Code 500: Internal Server Error." });
	}
}


// @desc create a new blog
// @route POST /admin/create
// @access Private

const createBlog = async (req, res) => {
	try {

		await Blog.create(req.body)

		res.status(200).json({ message: "success" })

	} catch(error) {
		console.log(error);
		res.status(500).json({ message: "Status Code 500: Internal Server Error." });
	}
}


// @desc Get specific blogs
// @route GET admin/blog/:id
// @access Private

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


// @desc Get Blogs
// @route GET admin/blog/
// @access Private

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
	deleteBlog,
	createBlog,
	getBlog,
	getBlogs
}