const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");

// @route /user/info

router.get('/info', (req, res) => {
	userController.getUserInfo(req, res);
});

module.exports = router;