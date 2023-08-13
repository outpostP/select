const { validationResult, body } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Validation failed", message: errors.array() });
  }
  next();
};

const validateLogin = [
  body("id").notEmpty().withMessage("Id is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("name cannot contain spaces");
      }
      return true;
    }),

  body("email").trim().isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one capital letter")
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/)
    .withMessage("Password must contain at least one special character"),
];



const validateUpdateProfile = [
  body('name')
    .if(body('name').exists())
    .notEmpty().withMessage('Name is required'),
  body('password')
    .if(body('password').exists())
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  body('birthday')
    .if(body('birthday').exists())
    .notEmpty().withMessage('Birthday is required'),
];

module.exports = {
  validateRequest,
  validateLogin,
  validateRegistration,
  validateUpdateProfile
};