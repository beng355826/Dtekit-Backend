const { userModel } = require("./createUser.model");
const encrypt = require("../utils/encrypt");
const isIdValid = require("../utils/isIdValid");

async function updateUserByIdModel(id, body) {
console.log(body);
  if (typeof await isIdValid(id) === "object") {
    return Promise.reject(await isIdValid(id));
  }

  if (body.email) {
    const encryptedEmail = await encrypt(body.email);
    body.password = encryptedEmail;
  }

  if (body.password) {
    const encryptedPassword = await encrypt(body.password);
    body.password = encryptedPassword;
  }

  const response = await userModel.findByIdAndUpdate(id, body, {
    useFindAndModify: false,
    new: true,
  });
console.log(response);
  return response;
}

module.exports = { updateUserByIdModel };
