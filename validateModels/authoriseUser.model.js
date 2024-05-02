const checkEncryptionDB = require('../utils/checkEncryptionDB')
const { userModel } = require("../UserModels/createUser.model");

async function authoriseUserModel(req) {
  try {

    const isPasswordCorrect = await checkEncryptionDB(req.password)
    if(req.otp === isPasswordCorrect.accountStatus){
      
      const updateStatus = await userModel.findOneAndUpdate({_id: isPasswordCorrect._id}, {$set: {accountStatus: 'active'}}, {new : true})

      console.log(updateStatus);
      return updateStatus

    } else {
      return Promise.reject({ msg: "403 - incorrect credentials" });
    }
  } catch {
    console.error(error);
    throw error;
  }
}

module.exports = { authoriseUserModel };
