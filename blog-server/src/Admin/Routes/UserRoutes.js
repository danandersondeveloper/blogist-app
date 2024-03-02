const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");


//@route /admin/user/delete

router.delete("/delete", (req, res) => {
	userController.deleteUser(req, res);
});


//@route /admin/user/update/:id

router.patch("/update/:id", (req, res) => {
	userController.updateUser(req, res);
});


//@route /admin/user/create

router.post("/create", (req, res) => {
	userController.createUser(req, res);
});


//@route /admin/user/export

router.post("/export", (req, res) => {
	userController.getExportedUsers(req, res);
});


//@route /admin/user/search

router.get("/search", (req, res) => {
	userController.getSearchedUsers(req, res);
});


//@route /admin/user/:id

router.get("/:id", (req, res) => {
	userController.getUser(req, res);
});


//@route /admin/user

router.get("/", (req, res) => {
	userController.getUsers(req, res);
});


module.exports = router;