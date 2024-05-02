const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b673e46a18294d",
    pass: "3ebb9a8f4a8a3b"
  }
});

const message = {
    from: "benjamin-green@live.co.uk",
    to: "bingle_lynny@aol.com",
    subject: "Hello!",
    text: "This is a test of Mailtrap and Nodemailer. "
}

transport.sendMail(message, (err, info) => {
if (err) {
   console.log(err)
} else {
   console.log(info);
}
});

module.exports = transport