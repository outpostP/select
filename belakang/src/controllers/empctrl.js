const db = require("../../models");
const Emp = db.Employee_Details;
const Store = db.Edit_URL
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function hashUserPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async function updateProfile(req, res) {
    const { token, name, password, birthday } = req.body;
    const { id } = req.user;
  
    try {
      const check = await Store.findOne({
        where: {
          URL: token
        }
      });
  
      if (!check) {
        return res.status(401).json({ message: 'You have accessed this page' });
      }
  
      const hashPassword = await hashUserPassword(password);
  
      await db.sequelize.transaction(async (t) => {
        await Emp.update(
          {
            name: name,
            password: hashPassword,
            birthday: birthday
          },
          {
            where: {
              id: id
            },
            transaction: t
          }
        );

        await Store.destroy({
          where: { token },
          transaction: t
        });
      });
  
      return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  

  module.exports = {hashUserPassword, updateProfile}