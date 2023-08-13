const express = require("express");
const router = express.Router();
const {verifyAdmin, verifyLogin} = require('../middleware/auth')
const {validateRegistration, validateRequest} = require('../middleware/validator')
const {addUser} = require('../controllers/adminctrl')

router.post('/register',verifyLogin, verifyAdmin,validateRegistration, validateRequest, addUser);


module.exports = router;