const eightDigitPasscode = require("../utils/eightDigitPasscode");
const checkEncryptionDB = require("../utils/checkEncryptionDB")
const { userModel } = require("../UserModels/createUser.model");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')


async function detectUserModel(req) {
  try {

    const correctUser = await checkEncryptionDB(req.body.email)
    
      if(correctUser) {
      const passcode = eightDigitPasscode();
      const statusUpdate = await userModel.findOneAndUpdate({_id: correctUser._id}, {$set: {accountStatus: passcode}}, {new : true})


      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "33d4d937e6dc83",
          pass: "3d52fea4db151e",
        },
      });
  
      const message = {
        from: "benjamin-green@live.co.uk",
        to: req.body.email,
        subject: "You are registered",
        text: "one time passcode: " + passcode + "'the link back to the site'"
      };

      const sendEmail = await transport.sendMail(message);

      
      return {
        userObject: statusUpdate,
        requestSuccessful: true
      }
    
    } else {
      return Promise.reject({ msg: "400 - email not registered" });
    }
  } catch {
    console.error(error);
    throw error;
  }
}

module.exports = { detectUserModel };
