const express = require("express");
const router = express.Router();

const authController = require("../Controllers/AuthController");


router.post('/login', (req, res) => {
	authController.login(req, res) }
);

router.get('/logout', (req, res) => {
	authController.logout(req, res);
});

router.get('/', (req, res) => {
	authController.isAutherised(req, res) 
});

module.exports = router;