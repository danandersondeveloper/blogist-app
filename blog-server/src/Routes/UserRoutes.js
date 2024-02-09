const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");

router.get('/', (req, res) => { userController.getUsers(req, res) });

router.post('/register', (req, res) => userController.createUser(req, res));

router.post('/login', (req, res) => {userController.loginUser(req, res)});

router.patch('/edit', (req, res) => {});

router.delete('/delete', (req, res) => {});

module.exports = router;