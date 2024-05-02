const { userModel } = require("./createUser.model");
const encrypt = require("../utils/encrypt");
const isIdValid = require("../utils/isIdValid");

async function updateUserByIdModel(id, body) {

  if (typeof await isIdValid(id) === "object") {
    return Promise.reject(await isIdValid(id));
  }

  
  if (body.email) {
    const doesEmailExit = await userModel.findOne({ email: body.email });
    if (doesEmailExit) {
      return Promise.reject({ msg: "email already registered" });
    }
  }

  if (body.password) {
    const encryptedPassword = await encrypt(body.password);
    body.password = encryptedPassword;
  }

  const response = await userModel.findByIdAndUpdate(id, body, {
    useFindAndModify: false,
    new: true,
  });

  return response;
}

module.exports = { updateUserByIdModel };
