// Path: backend/utils/sendEmail.js

const nodemailer = require('nodemailer');

// Function to send an email using Gmail SMTP
const sendEmail = async (to, subject, text) => {
  // Create reusable transporter using Gmail service
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send the email
  await transporter.sendMail({
    from: `"Task Manager" <${process.env.EMAIL_USER}>`, // Sender name and address
    to,     // Recipient email address
    subject, // Email subject
    text, 
  });
};

module.exports = sendEmail;
