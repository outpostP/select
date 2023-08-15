const express = require("express");
const router = express.Router();
const {updateProfile,getAbsent, getDaily} = require('../controllers/empctrl')
const {validateUpdateProfile, validateRequest} = require('../middleware/validator')
const {profileToken, loginToken} = require('../middleware/token')

router.post('/profile',profileToken, validateUpdateProfile, validateRequest, updateProfile)
router.get('/atd',loginToken, getAbsent )
router.get('/daily',loginToken, getDaily )

module.exports = router