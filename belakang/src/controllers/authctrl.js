const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../../models");
const Emp = db.Employee_Details;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Attendance = db.Employee_Attendance;
const Daily = db.Employee_Daily_Salary;
const Dasar = db.Employee_Base_Salary;


async function Login (req, res) {
    try {
        const {id, password} = req.body;
        console.log(id, password)
        const user = await Emp.findByPk(id)
        console.log(user)
        if (!user) {
          return res.status(404).json({error: 'no user found'})
      }
        const passCheck = await bcrypt.compare(password, user.password)
        console.log(passCheck)
        if (!passCheck) {
          return res.status(400).json({error: 'wrong password'})
      }
        const payload = {
          id: user.id,
          role: user.role_id
        }
        const token = generateToken(payload, process.env.JWT_KEY_LOGIN)
        await db.sequelize.transaction(async (t) => {
          await Attendance.create({
            emp_id: id
          },
          {transaction: t}
          )

        // Get base salary
      const baseSalaryRecord = await Dasar.findOne({ where: { emp_id: id } });

      const baseSalary = baseSalaryRecord ? baseSalaryRecord.base_salary : 0;
      
      
      // Calculate daily salary for the login and record it (base_salary * 0.5)
      await Daily.create({
        emp_id: id,
        daily_salary: baseSalary * 0.5
      }, {transaction: t});
    })
        res.status(200).json({message: 'Login successful', token: token})
    } catch (error) {
        res.status(500).json(error)
    }
}

async function Logout (req,res) {
  try {
    const {id} = req.user;
    await db.sequelize.transaction(async (t) => {
      // Update the Attendance to set hasOut = true
      await Attendance.update({ hasOut: true }, 
      { 
        where: { emp_id: id }, 
        transaction: t 
      });
      
      // Get base salary
      const baseSalaryRecord = await Dasar.findOne({ where: { emp_id: id } });
      const baseSalary = baseSalaryRecord ? baseSalaryRecord.base_salary : 0;
      
      // Find the appropriate Daily record and update daily_salary to (base_salary * 1)
      const dailyRecord = await Daily.findOne({ where: { emp_id: id } });
      if (dailyRecord) {
        dailyRecord.daily_salary = baseSalary;
        await dailyRecord.save({ transaction: t }); // Updates the daily_salary to base_salary * 1
      }
    })
    res.status(200).json({message: 'Logout succeed'})
  } catch (error) {
      console.log(error)
      res.status(500).json(error)
  }
}

  function generateToken(payload, jwtKey) {
    return jwt.sign(payload, jwtKey);
  }
  

  module.exports = { Login, Logout}