const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");

router.get('/', (req, res) => {
	userController.getUsers(req, res);
});

router.get('/:id', (req, res) => {
	userController.getUser(req, res);
});

router.post('/register', (req, res) => {
	userController.createUser(req, res);
});

router.patch('/edit/:id', (req, res) => {
	userController.editUser(req, res);
});

router.delete('/delete', (req, res) => {
	userController.deleteUser(req, res);
});

module.exports = router;