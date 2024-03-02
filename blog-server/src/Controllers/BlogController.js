// Data model 
const Blog = require("../Models/BlogModel");

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
	getBlogs
}
