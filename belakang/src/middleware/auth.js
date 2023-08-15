const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("../../models");
require("dotenv").config({
  path: path.resolve("../.env"),
});
const Emp = db.Employee_Details;
const Role = db.Employee_Role;

const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  const verifier = process.env.JWT_KEY;
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized token",
      message: "No token",
    });
  }

  try {
    token = token.split(" ")[1];

    if (token === "null" || !token) {
      return res.status(401).json({
        error: "Unauthorized token",
        message: "No bearer token",
      });
    }

    let verifiedUser = jwt.verify(token, verifier);
    if (!verifiedUser) {
      return res.status(401).json({
        error: "Unauthorized token",
        message: "Invalid token",
      });
    }
    req.user = verifiedUser;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Unauthorized token",
      message: err.message,
    });
  }
};

const verifyLogin = async (req, res, next) => {
  let token = req.headers.authorization;
  const verifier = process.env.JWT_KEY_LOGIN;
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized token",
      message: "No token",
    });
  }

  try {
    token = token.split(" ")[1];

    if (token === "null" || !token) {
      return res.status(401).json({
        error: "Unauthorized token",
        message: "No bearer token",
      });
    }

    let verifiedUser = jwt.verify(token, verifier);
    if (!verifiedUser) {
      return res.status(401).json({
        error: "Unauthorized token",
        message: "Invalid token",
      });
    }
    req.user = verifiedUser;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Unauthorized token",
      message: err.message,
    });
  }
};

async function verifyAdmin(req, res, next) {
  try {
    const user = await Emp.findOne({ where: { id: req.user.id } });

    const role = await Role.findOne({ where: { id: user.role_id } });

    if (role && role.role.toLowerCase() === 'admin') {
      return next(); 
    } else {
      return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
    }
  } catch (error) {
    return res.status(500).send({ message: `Error: ${error.message}` });
  }
}

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyLogin,
};