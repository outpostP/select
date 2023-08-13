const express = require("express");
const router = express.Router();
const {validateRegistration, validateLogin, validateRequest} = require('../middleware/validator')
const {addUser, Login} = require('../controllers/authctrl')

router.post('/register',validateRegistration, validateRequest, addUser);
// router.post('/login', validateLogin, validateRequest, authController.login);

module.exports = router;