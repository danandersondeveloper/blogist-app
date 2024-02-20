const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");


// @desc Check if a user is autherised / logged in
// @route GET /auth
// @access Private

const isAutherised = (req, res) => {
	const authCookie = req.cookies.auth_user;

	console.log(authCookie);

	if (authCookie) {

		const isAdmin = authCookie.includes("admin") ? true : false 

		res.status(200).json({
			message: {
				loggedIn: true,
				admin: isAdmin
			}
		});
	}
}


// @desc Login a user
// @route POST /users
// @access Private

const login = async (req, res) => {
	try {

		const {email, password} = req.body;

		if (email.length <= 0 || password.length <= 0) return res.status(400).json({ message: "Bad request!" });

		const user = await User.findOne({"email": email});
	
		if (user == null) return res.status(400).json({ message: "Incorrect username or password" });
	
		if (!(bcrypt.compareSync(password, user.password))) return res.status(400).json({ message: "Incorrect username or password" }); 

		const cookieOptions = {
			maxAge: 1000 * 60 * 30,
			httpOnly: true
		}

		res.cookie('auth_user', `userId=${user._id};name=${user.firstName};role=${user.role};`, cookieOptions);
		res.status(200).json({ message: "success", role: user.role });

	} catch(err) {
		console.log(err);
		res.status(500).json({ message: "Status Code 500: Internal server error."});
	}

}

module.exports = { isAutherised, login }