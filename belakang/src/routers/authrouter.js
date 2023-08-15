const express = require("express");
const router = express.Router();
const {validateLogin, validateRequest} = require('../middleware/validator')
const {Login, Logout, clockingIn} = require('../controllers/authctrl');
const {loginToken} = require('../middleware/token')


router.post('/login', validateLogin, validateRequest, Login);
router.post('/logout', loginToken, Logout);
router.post('/clockin', loginToken, clockingIn);

module.exports = router;