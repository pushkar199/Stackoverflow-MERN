require('dotenv').config();
const router = require("express").Router();
const authController = require("../controller/auth");
const userController = require("../controller/user")
const auth = require( "../middleware/auth" );

router.post('/api/register', authController.register);
router.post('/api/login', authController.login);
router.post('/api/logout', auth, authController.logout);

router.get('/api/getAllUser', userController.getAllUser);
router.patch('/api/updateProfile', userController.updateProfile)



module.exports = router;
