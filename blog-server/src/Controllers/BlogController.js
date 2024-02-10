const express = require("express");

// Model imports
const Blog = require("../Models/BlogModel");

const getBlogs = (req, res) => {
	try {
		
		res.status(200);
		res.json({ message: "Request made to get list of blogs" })

	} catch(err) {
		return err
	}
}

module.exports = { getBlogs }
