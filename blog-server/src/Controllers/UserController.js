const express = require("express");
const bcrypt = require("bcrypt");

// Model imports
const User = require("../Models/UserModel");


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
		res.json({ message: "Status Code 500: Internal server error." });
		console.log(error);

	}
};


const getUser = async (req, res) => {
	try {
		
		const userId = req.params.id
		const user = await User.findById(userId).select("-password");
		return res.status(200).json(user);

	} catch(error) {

		res.status(500);
		res.json({ message: "Status Code 500: Internal server error." });
		console.log(error);

	}
}


// @desc Create a new user
// @route POST /users
// @access Private

const createUser = async (req, res) => {
	try {

		const { firstName, lastName, email, password } = req.body;

		if (firstName.length <= 0 || lastName.length <= 0 || email.length <= 0 || password.lengh <= 0) return res.json({ message: "First and Last name are reqired!" });

		if (!email.includes('@') || !email.includes('.com') & !email.includes('.co.za')) return res.json({ message: "Invalid email address" });

		if (password.length < 5) return res.json({ message: "Password too short!" });

		if (await User.findOne({"email": email})) return res.json({message: "This users already exists! Try logging in."})

		const saltRounds = 10;
		const encryptedPassword =  await bcrypt.hash(password, saltRounds);

		const newUser = {
			"firstName": firstName,
			"lastName": lastName,
			"email": email,
			"password": encryptedPassword
		}

		await User.create(newUser);

		return res.json({ message: "Successfull request" })

	} catch(err) {

		console.log(err);
		res.status(500).json({ message: "Status Code 500: Internal server error." });

	}
};


// @desc Login a users
// @route POST /users
// @access Private

const editUser = async (req, res) => {
	try {

		const { _id, firstName, lastName, email, role, active } = req.body;
		const filter = { "_id": _id }

		const update = {
			"firstName": firstName,
			"lastName": lastName,
			"email": email,
			"role": role,
			"active": active
		}

		const resposne = await User.findByIdAndUpdate(_id, update).select("-password")

		res.status(200).json({ message: "success" })

	} catch(error) {

		res.status(500);
		res.json({ message: "Status Code 500: Internal server error." });
		console.log(error);

	}
}

module.exports = {getUsers, getUser, createUser, editUser}