const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");


// @desc Check if a user is autherised / logged in
// @route GET /auth
// @access Private

const isAutherised = (req, res) => {

	try {
		const authCookie = req.cookies.auth_user;

		if (authCookie) {
	
			const userInfomation = authCookie.split(';');
			const userId = userInfomation[0].replace("userId=", "");
			const userName = userInfomation[1].replace("name=", "");
			const userRole = userInfomation[2].replace("role=", "");
	
			res.status(200).json({
				auth: true,
				user: {
					id: userId,
					name: userName,
					role: userRole
				}
			});
		} else {
			res.status(200).json({
				auth: false,
				user : {
					id: null,
					name: null,
					role: "guest"
				}
			})
		}
	} catch(error) {
		console.log(err);
		res.status(500).json({ message: "Status Code 500: Internal server error."});
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
		res.status(200).json({ 
			message: "success",
			setAUTH: {
				auth: true,
				user: {
					id: user._id,
					name: user.firstName,
					role: user.role
				}
			}
		});

	} catch(err) {
		console.log(err);
		res.status(500).json({ message: "Status Code 500: Internal server error."});
	}

}

const logout = (req, res) => {

	console.log("LOGOUT!!!!!")

	res.clearCookie("auth_user");

	res.status(200).json({
		message: 'sucsess',
		setAUTH: {
			auth: false,
			user: {
				id: null,
				name: "guest",
				role: "guest"
			}
		}
	});

}

module.exports = {
	isAutherised,
	login,
	logout 
}