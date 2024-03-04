const bcrypt = require("bcrypt");
const fs = require("node:fs");

// Model imports

const User = require("../Models/UserModel");

const getUserInfo = async (req, res) => {

	const authCookie = req.cookies.auth_user;

	if (!authCookie) return res.status(401).json({ message: "unautherized" });

	const userInformation = authCookie.split(";");
	const userId = userInformation[0].replace("userId=", "");

	const user = await User.findById(userId).select(["-password", "-_id"]);

	res.status(200).json({user});
}

module.exports = {
	getUserInfo
}