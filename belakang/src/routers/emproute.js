const express = require("express");
const router = express.Router();
const {updateProfile,hashUserPassword} = require('../controllers/empctrl')

router.post('profile', updateProfile)

module.exports = router