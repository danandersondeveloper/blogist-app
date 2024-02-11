const express = require("express");
const router = express.Router();

const authController = require("../Controllers/AuthController");

router.get('/', (req, res) => { authController.isAutherised(req, res) });

router.post('/login', (req, res) => { authController.login(req, res) })

module.exports = router;