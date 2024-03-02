const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");


//@route /admin/user/delete

router.delete("/delete", (req, res) => {
	
});


//@route /admin/user/update/:id

router.patch("/update/:id", (req, res) => {

});


//@route /admin/user/create

router.post("/create", (req, res) => {

});


//@route /admin/user/export

router.post("/export", (req, res) => {

});


//@route /admin/user/search

router.get("/search", (req, res) => {

});


//@route /admin/user/:id

router.get("/:id", (req, res) => {

});


//@route /admin/user

router.get("/", (req, res) => {

});


module.exports = router;