const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const db = require("../../models");
const Emp = db.Employee_Details;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        
    }
}