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
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("Username cannot contain spaces");
      }
      return true;
    }),

  body("email").trim().isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one capital letter")
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm password doesn't match the password");
    }
    return true;
  }),
];

const validateUpdateUsernameEmail = [
  body("cashierId").trim().notEmpty().withMessage("cashierId is required"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .custom((value) => {
      if (value.includes(" ")) {
        throw new Error("Username cannot contain spaces");
      }
      return true;
    }),
  body("email").trim().isEmail().withMessage("Invalid email format"),
];

const validateForgotPassword = [
  body("email").trim().isEmail().withMessage("Invalid email format"),
];

const validateResetPassword = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one capital letter")
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm password doesn't match the password");
    }
    return true;
  }),
];

const validateUpdatePassword = [
  body("cashierId").trim().notEmpty().withMessage("cashierId is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one capital letter")
    .matches(/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm password doesn't match the password");
    }
    return true;
  }),
];

const validateUpdateStatus = [
  body("cashierId").trim().notEmpty().withMessage("cashierId is required"),

  body("isActive").trim().notEmpty().withMessage("isActive is required"),
];

module.exports = {
  validateRequest,
  validateLogin,
  validateRegistration,
  validateUpdateUsernameEmail,
  validateUpdatePassword,
  validateUpdateStatus,
  validateForgotPassword,
  validateResetPassword,
};