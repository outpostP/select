const express = require("express");
const router = express.Router();
const {verifyAdmin, verifyLogin} = require('../middleware/auth')
const {validateRegistration, validateRequest} = require('../middleware/validator')
const {addUser, getAbsent, getDaily, updateMonthly, getMonthly, getUsers} = require('../controllers/adminctrl')

router.post('/register',verifyLogin, verifyAdmin,validateRegistration, validateRequest, addUser);
router.get('/atd',verifyLogin, verifyAdmin, getAbsent);
router.get('/daily',verifyLogin, verifyAdmin, getDaily);
router.post('/monthly',verifyLogin, verifyAdmin, updateMonthly);
router.get('/monthly',verifyLogin, verifyAdmin, getMonthly);
router.get('/user',verifyLogin, verifyAdmin, getUsers);


module.exports = router;