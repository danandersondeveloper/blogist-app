const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	picture: {
		type: String,
	},
	shortDescription: {
		type: String
	},
	content: {
		type: String
	},
	status: {
		type: Boolean,
		default: false
	},
	category: {
		type: String
	},
	created: {
		type: String,
		default: new Date().toLocaleDateString('en-GB')
	}
});

module.exports = mongoose.model("Blog", blogSchema)