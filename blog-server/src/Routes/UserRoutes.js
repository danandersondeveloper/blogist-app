const express = require("express");
const cors = require("cors");
const userController = require("../Controllers/UserController");
const router = express.Router();


router.get('/', (req, res) => { userController.getUsers(req, res) });

router.post('/register', (req, res) => userController.createUser(req, res));

router.patch('/edit', (req, res) => {});

router.delete('/delete', (req, res) => {});

module.exports = router;