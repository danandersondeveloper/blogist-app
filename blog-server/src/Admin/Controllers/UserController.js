const bcrypt = require("bcrypt");
const fs = require("node:fs");

// Data Models

const User = require("../../Models/UserModel");


// @desc Delete a user from the Database
// @route DELETE /user/delete
// @access Private

const deleteUser = async ( req, res ) => {
	try {
	
		const userId = req.body.requestBody._id;
		const userDeleteString = req.body.requestBody.deleteString;

		if (userDeleteString != "DELETE") return res.status(422).json({ message: "Invalid input, please try again!" });

		await User.findByIdAndDelete(userId);

		res.status(200).json({ message: "success" })

	} catch(error) {
		
		res.status(500);
		res.json({ message: "Status Code 500: Internal Server Error." });
		console.log(error);

	}
}


// @desc Edit a users details
// @route PATCH /user/update/:id
// @access Private

const updateUser = async ( req, res ) => {
	try {

		const { _id, firstName, lastName, email, role, active } = req.body;

		const update = {
			"firstName": firstName,
			"lastName": lastName,
			"email": email,
			"role": role,
			"active": active
		}

		await User.findByIdAndUpdate(_id, update).select("-password")

		res.status(200).json({ message: "success" })

	} catch(error) {

		res.status(500);
		res.json({ message: "Status Code 500: Internal Server Error." });
		console.log(error);

	}
}

// @desc Create a new user
// @route POST /user
// @access Private

const createUser = async (req, res) => {
	try {

		const { firstName, lastName, email, password, role, active } = req.body;

		if (firstName.length <= 0 || lastName.length <= 0 || email.length <= 0 || password.lengh <= 0) return res.json({ message: "First and Last name are reqired!" });
		if (!email.includes('@') || !email.includes('.com') & !email.includes('.co.za')) return res.json({ message: "Invalid email address" });
		if (password.length < 5) return res.json({ message: "Password too short!" });
		if (await User.findOne({"email": email})) return res.json({message: "This users already exists! Try logging in."})

		const saltRounds = 10;
		const encryptedPassword =  await bcrypt.hash(password, saltRounds);

		if (role && active) {
			const newUser = {
				"firstName": firstName,
				"lastName": lastName,
				"email": email,
				"password": encryptedPassword,
				"role": role,
				"active": active
			}

			await User.create(newUser);

		} else {
			const newUser = {
				"firstName": firstName,
				"lastName": lastName,
				"email": email,
				"password": encryptedPassword
			}	

			await User.create(newUser);
		}

		return res.json({ message: "success" })

	} catch(err) {

		console.log(err);
		res.status(500).json({ message: "Status Code 500: Internal Server Error." });

	}
};

// @desc Get and prepare user export
// @route GET /user/export
// @access Private

const getExportedUsers = async (req, res) => {
	try {

		const users = await User.find({}).select(["-password", "-_id"]);
		const jsonData = JSON.stringify(users);

		fs.writeFileSync('public/Assets/Exports/export.json', jsonData, "utf-8");

		res.status(200).download("public/Assets/Exports/export.json", "user-export.json");
		

	} catch ( error ) {

		res.status(500);
		res.json({ message: "Status Code 500: Internal Server Error." });
		
	}
}


// @desc Get users based on search query
// @route GET /user/search
// @access Private

const getSearchedUsers = async (req, res) => {
	try {

		const searchString = req.query.search;
		const users = await User.find({ $text : { $search: searchString } }).select("-password");

		return res.status(200).json(users);

	} catch(error) {
		res.status(500);
		res.json({ message: "Status Code 500: Internal Server Error." })
		//console.log(error);
	}
};


// @desc Get a specific user
// @route GET /user/:id
// @access Private

const getUser = async (req, res) => {
	try {
		
		const userId = req.params.id
		const user = await User.findById(userId).select("-password");
		return res.status(200).json(user);

	} catch(error) {

		res.status(500);
		res.json({ message: "Status Code 500: Internal Server Error." });
		console.log(error);

	}
};


// @desc Get all users
// @route GET /users
// @access Private

const getUsers = async (req, res) => {
	try {

		const users = await User.find({}).select("-password").lean();

		if (users.length <= 0) return res.status(503).json({ message: "No user data found!" });
		return res.status(200).json(users);

	} catch(error) {

		res.status(500)
		res.json({ message: "Status Code 500: Internal Server Error." });
		console.log(error);

	}
};

module.exports = {
	deleteUser,
	updateUser,
	createUser,
	getExportedUsers,
	getSearchedUsers,
	getUser,
	getUsers
}