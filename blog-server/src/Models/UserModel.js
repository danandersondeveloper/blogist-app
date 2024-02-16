const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: "user"
	},
	active: {
		type: Boolean,
		default: true
	}
	
});

userSchema.index({
	firstName: "text",
	lastName: "text",
	email: "text"
});

module.exports = mongoose.model("User", userSchema);