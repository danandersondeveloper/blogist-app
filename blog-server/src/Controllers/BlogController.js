const express = require("express");

// Model imports
const Blog = require("../Models/BlogModel");

const createBlog = async (req, res) => {
	try {

		await Blog.create(req.body)

		res.status(200).json({ message: "success" })

	} catch(error) {
		console.log(error);
		res.status(500).json({ message: "Status Code 500: Internal Server Error." });
	}
}

const getBlogs = (req, res) => {
	try {
		
		res.status(200);
		res.json({ message: "Request made to get list of blogs" })

	} catch(error) {

		console.log(error);
		res.status(500).json({ message: "Status Code 500: Internal Server Error." });

	}
}

module.exports = {
	createBlog,
	getBlogs
}
