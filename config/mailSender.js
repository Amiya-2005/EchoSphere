const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host : process.env.SMTP_HOST,
    secure : true,
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.APP_PASS
    }
});

module.exports = transporter;