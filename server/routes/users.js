require('dotenv').config();
const router = require("express").Router();
const authController = require("../controller/auth");
const auth = require( "../middleware/auth" );

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);
router.post('/api/logout', auth, authController.logout);

module.exports = router;
