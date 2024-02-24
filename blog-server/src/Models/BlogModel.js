const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: false
	},
	shortDescription: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	state: {
		type: String,
		default: "draft"
	},
	created: {
		type: String,
		default: new Date().toLocaleDateString('en-GB')
	}
});

module.exports = mongoose.model("Blog", blogSchema)