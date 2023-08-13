const express = require("express");
const router = express.Router();
const {updateProfile,hashUserPassword} = require('../controllers/empctrl')
const {validateUpdateProfile, validateRequest} = require('../middleware/validator')
const {profileToken} = require('../middleware/token')

router.post('/profile',profileToken, validateUpdateProfile, validateRequest, updateProfile)

module.exports = router