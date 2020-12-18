const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: process.env.email_user,
      pass: process.env.email_password,
    },
  });

  const mailOptions = {
    from: "Abd Alwahab <alwahaba47@gmail.com>",
    to: options.reciver,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
