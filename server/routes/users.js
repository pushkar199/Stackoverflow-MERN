require('dotenv').config();
const router = require("express").Router();
const authController = require("../controller/auth");

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);
router.post('/api/logout', authController.logout);

module.exports = router;
