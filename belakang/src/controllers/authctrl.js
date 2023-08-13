const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../../models");
const Emp = db.Employee_Details;
const Store = db.Edit_URL
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Attendance = db.Employee_Attendance
const fs = require('fs').promises;
const handlebars = require('handlebars');
const transporter = require('../middleware/transporter')
const {Op} = require('sequelize');


async function Login (req, res) {
    try {
        const {id, password} = req.body;
        const user = await Emp.findByPk(id)
        if (!user) {
            res.status(404).json({error: 'no user found'})
        }
        const passCheck = await bcrypt.compare(password, user.password)
        if (!passCheck) {
            res.status(400).json({error: 'wrong password'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const checkIfExists = async (email, name) => {
    const user = await Emp.findOne({
        where: {
            [Op.or]: [{ email }, { name }]
        }
    });
    return user;
  };
  
  async function hashUserPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async function createUser({ name, email, password }) {
    return await Emp.create(
      {
        name,
        email,
        password,
      },
    );
  }

  async function sendVerification(email, name, id, token, redirect) {
    try {
      console.log('awo');
      const filePath = path.resolve(__dirname, './email.html');
      const data = await fs.readFile(filePath, 'utf-8');
      const tempCompile = handlebars.compile(data);
      const tempResult = tempCompile({ email, name, id, token, redirect });
      await transporter.sendMail({
        to: email,
        subject: 'verify',
        html: tempResult
      });
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }
  

  const createUserAndSendEmail = async (name, email, password) => {

  try {
    const hashPassword = await hashUserPassword(password);

    const result = await createUser({
      name,
      email,
      password: hashPassword,
    });

    const payload = {
      id: result.id,
    }

    const token = generateToken(payload, process.env.JWT_KEY);
    console.log('f')

    const redirect = `https://localhost3000/profile/${token}`;

    await sendVerification(email, name, result.id, token, redirect);
    const {id} = result
    return {token, id};
  } catch (err) {
    throw new Error('register failed: ' + err.message);
  }
};
  
  function generateToken(payload, jwtKey) {
    return jwt.sign(payload, jwtKey);
  }
  
  const addUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const isExist = await checkIfExists(email, name);
  
      if (isExist) {
        return res.status(400).json({ message: 'email or name has been used' });
      }
  
      const token = await createUserAndSendEmail(name, email, password);
      await db.sequelize.transaction(async(t) => {
        await Store.create({
          URL: token.token,
          emp_id: token.id
        },
        {transaction: t}
        )
      })
      return res.status(200).json({ message: 'register succeed', data: { name, email } });
  
    } catch (err) {
      console.error(err); // Log the error message to the console
      return res.status(500).json({ message: 'register failed', error: err.message });
    }
  };
  


async function Logout (req,res) {

}

  module.exports = {addUser, Login, Logout}