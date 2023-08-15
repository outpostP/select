const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');
const getEmailTransporter = require('./transporter'); 

const sendVerification = async (email, id,password, verificationToken)  => {
    try {
      const data = await fs.readFile(path.resolve(__dirname,'./email.html'), 'utf-8');
      const template = handlebars.compile(data);

      const tempResult = template({
        id: id,
        password: password,
        redirect: `https://localhost:3000/auth/edit/${verificationToken}`,
      });
  
      await getEmailTransporter.sendMail({
        to: email,
        subject: 'Edit Profile',
        html: tempResult,
      });
      console.log('Verification email sent successfully.');
    } catch (err) {
      console.error('Error sending verification email:', err);
    }
  };
  


module.exports = sendVerification;
