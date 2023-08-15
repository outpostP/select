const db = require("../../models");
const Emp = db.Employee_Details;
const Store = db.Edit_URL
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Attendance = db.Employee_Attendance;
const Daily = db.Employee_Daily_Salary;
const Dasar = db.Employee_Base_Salary;

async function hashUserPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async function updateProfile(req, res) {
    const { name, password, birthday } = req.body;
    const { id } = req.user;
    const { token } = req;
    console.log(token);
  
    try {
      const check = await Store.findOne({
        where: {
          URL: token,
        },
      });
  
      if (!check) {
        return res.status(401).json({ message: 'You have accessed this page' });
      }
  
      const updateFields = {};
  
      if (name) {
        updateFields.name = name;
      }
  
      if (password) {
        const hashPassword = await hashUserPassword(password);
        updateFields.password = hashPassword;
      }
  
      if (birthday) {
        updateFields.birthday = birthday;
      }
  
      await db.sequelize.transaction(async (t) => {
        await Emp.update(updateFields, {
          where: {
            id: id,
          },
          transaction: t,
        });
  
        await Store.destroy({
          where: { URL: token },
          transaction: t,
        });
      });
  
      return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }
  
  async function getAbsent (req,res) {
    try {
      const {id} = req.user;
      const absent = await Attendance.findAll({
        where: {
          emp_id: id
        }
      })
      res.status(200).json(absent)
    } catch (error) {
      console.error(error)
      res.status(200).json(error)
    }
  }

  async function getDaily (req,res) {
    try {
      const {id} = req.user;
      const daily = await Daily.findAll({
        where: {
          emp_id: id
        }
      });
      res.status(200).json(daily);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }

  
  module.exports = {getAbsent, updateProfile, getDaily}