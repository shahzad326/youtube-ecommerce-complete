const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Hey <abc@gmail.com>', // sender address
    to: data.to,
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });
});

module.exports = { sendEmail };
