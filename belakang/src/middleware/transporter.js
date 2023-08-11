const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({
  path: path.resolve("../.env"),
});

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});
const SendEmail = {
  verifyEmail: async (dataEmail, dataToken) => {
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: dataEmail,
      subject: "Email Verification",
      text: "Please verify your email by clicking the link below:",
      html: `<body>
      <h2>Hello shop next door!!</h2>
      <p>
            Please click the button below to reset your password.
      </p>
      <a href="http://localhost:3000/reset-password/${dataToken}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: block; width: 200px; margin: 20px auto;">
            Verify Email
      </a>
      <p>
            If you did not initiate this action, you can ignore this email.
      </p>
      <p>
          Thank you,
          The Website Team
      </p>
  </body>`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  },
};

module.exports = SendEmail;