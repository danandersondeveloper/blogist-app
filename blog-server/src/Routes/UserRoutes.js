const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");


// @route /users

router.get('/', (req, res) => {
	userController.getUsers(req, res);
});


// @route /users/id

router.get('/:id', (req, res) => {
	userController.getUser(req, res);
});


// @route /users/search

router.get('search', (req, res) => {
	userController.searchUsers(req, res);
});


// @route /users/regster

router.post('/register', (req, res) => {
	userController.createUser(req, res);
});


// @route /users/edit/:id

router.patch('/edit/:id', (req, res) => {
	userController.editUser(req, res);
});


// @route /users/delete

router.delete('/delete', (req, res) => {
	userController.deleteUser(req, res);
});

module.exports = router;