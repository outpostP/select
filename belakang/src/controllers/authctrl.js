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
const { Op } = require("sequelize");


async function Login(req, res) {
  try {
    const { id, password } = req.body;

    const user = await Emp.findOne({ where: { id: id } }); 

    if (!user) {
      return res.status(404).json({ error: 'no user found' });
    }
    
    const passCheck = await bcrypt.compare(password, user.password);

    if (!passCheck) {
      return res.status(400).json({ message: 'wrong password' });
    }
    
    const payload = {
      id: user.id,
      role: user.role_id
    };

    const token = generateToken(payload, process.env.JWT_KEY_LOGIN);

    res.status(200).json({ message: 'Login successful', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error});
  }
}

async function clockingIn(req, res) {
  try {
    const { id } = req.user;
    const tokenPayload = req.user
    var updatedToken = null;
    console.log(id)
    const user = await Emp.findOne({ where: { id: id } }); 

    if (!user) {
      return res.status(404).json({ error: 'no user found' });
    }
    
    const existingAttendance = await Attendance.findOne({
      where: {
        emp_id: id,
        createdAt: {
          [Op.gte]: new Date().setHours(0, 0, 0, 0), 
        },
      },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance for the day already exists' });
    }
    
    let attendance = null;
    
    await db.sequelize.transaction(async (t) => {
      attendance = await Attendance.create(
        {
          emp_id: id,
        },
        { transaction: t }
      );

      updatedToken = generateToken({ ...tokenPayload, attendanceId: attendance.id }, process.env.JWT_KEY_LOGIN);

      const baseSalaryRecord = await Dasar.findOne({ where: { emp_id: id } });
      const baseSalary = baseSalaryRecord ? baseSalaryRecord.base_salary : 0;

      await Daily.create(
        {
          emp_id: id,
          daily_salary: baseSalary * 0.5,
        },
        { transaction: t }
      );
    });
    res.status(200).json({ message: 'Clock in successful', token: updatedToken });

  } catch (error) {
    console.error(error);
    res.status(500).json({message: error});
  }
}

async function Logout(req, res) {
  try {
    const { attendanceId, id } = req.user;  
    console.log('awwo', attendanceId)
    await db.sequelize.transaction(async (t) => {
      await Attendance.update(
        { hasOut: true },
        {
          where: { id: attendanceId }, 
          transaction: t,
        }
      );

      const baseSalaryRecord = await Dasar.findOne({ where: { emp_id: id } });
      const baseSalary = baseSalaryRecord ? baseSalaryRecord.base_salary : 0;

      const dailyRecord = await Daily.findOne({ where: { emp_id: id } });
      if (dailyRecord) {
        dailyRecord.daily_salary = baseSalary;
        await dailyRecord.save({ transaction: t });
      }
    });

    res.status(200).json({ message: 'Logout succeed' });
  } catch (error) {
    console.error(error)
    res.status(500).json({message: error});
  }
}

  function generateToken(payload, jwtKey) {
    return jwt.sign(payload, jwtKey);
  }
  

  module.exports = { Login, Logout, clockingIn}