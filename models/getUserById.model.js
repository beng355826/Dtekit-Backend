const mongoose = require('mongoose')
const {userModel} = require('./createUser.model')
const isIdValid = require("../utils/isIdValid");

async function getUserByIdModel (id) {
    
    if (typeof await isIdValid(id) === "object") {
        return Promise.reject(await isIdValid(id));
      }

    const response = await(userModel.find({_id : id }))
    return response[0]


}

module.exports = {getUserByIdModel}