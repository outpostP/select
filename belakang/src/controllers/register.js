const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../../models");
const Emp = db.Employee_Details;
const Attendance = db.Employee_Attendance
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require('fs').promises;
const handlebars = require('handlebars');
const transporter = require('../middleware/transporter')

async function sendVerification(email, username, token, redirect) {
    const data = await fs.readFile(path.resolve(__dirname, '../../email/registerEmail.html'), 'utf-8');
    const tempCompile = handlebars.compile(data);
    const tempResult = tempCompile({ email, username, token, redirect });
    await transporter.sendMail({
      to: email,
      subject: 'verify',
      html: tempResult
    });
  }

  async function hashUserPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } 
function generateToken(payload, jwtKey) {
    return jwt.sign(payload, jwtKey, {
      expiresIn: '1h',
    });
  }

  const createUserAndSendEmail = async (username, email, password) => {
    try {
      const hashPassword = await hashUserPassword(password);
      let result; 
      await db.sequelize.transaction(async (t) => {
        result = await createUser({
          username,
          email,
          password: hashPassword,
          phone,
          transaction: t,
        });
      });
      const { username, password, email, id } = result.dataValues;
      const payload = {
        id,
      }
      
      const token = generateToken(payload, process.env.JWT_KEY_VERIFY);
      const redirect = `https://localhost3000/profile/${token}`;
      await sendVerification(resultEmail, resultUsername, token, redirect);
  
    } catch (err) {
      throw new Error('register failed', err);
    }
  };

  const registerUser = async (req, res) => {
    const { username, email,  password } = req.body;

    const isExist = await checkIfExists(email, username, phone);
    console.log(isExist);
    
    if (isExist) {
        return res.status(400).json({ message: 'email or username has been used' });
    }

    try {
        console.log(2);
        await createUserAndSendEmail(username, email, password);
        console.log(3);
        return res.status(200).json({ message: 'register succeed', data: { username, email, phone } });
    } catch (err) {
        return res.status(500).json({ message: 'register failed', error: err.message });
    }
};