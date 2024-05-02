const { userModel } = require("../UserModels/createUser.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

async function checkEncryptionDB(string) {
  const allUserObjects = await userModel.find();

  for (let i = 0; i < allUserObjects.length; i++) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(string)) {
      const result = await bcrypt.compare(
        string.toLowerCase(),
        allUserObjects[i].email
      );
      if (result) {
        return allUserObjects[i];
      }
    } else {
      const result = await bcrypt.compare(string, allUserObjects[i].password);

      if (result) {
        return allUserObjects[i];
      }
    }
  }

  return false;
}

module.exports = checkEncryptionDB;
