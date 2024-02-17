const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");


// @route /user/delete

router.delete('/delete', (req, res) => {
	userController.deleteUser(req, res);
});


// @route /user/edit/:id

router.patch('/edit/:id', (req, res) => {
	userController.editUser(req, res);
});


// @route /user/regster

router.post('/register', (req, res) => {
	userController.createUser(req, res);
});


// @route /user/export

router.get('/export', (req, res) => {
	userController.getExportedUsers(req, res);
});


// @route /user/search

router.get('/search', (req, res) => {
	userController.getSearchedUsers(req, res);
});


// @route /users/id

router.get('/:id', (req, res) => {
	userController.getUser(req, res);
});


// @route /user

router.get('/', (req, res) => {
	userController.getUsers(req, res);
});

module.exports = router;