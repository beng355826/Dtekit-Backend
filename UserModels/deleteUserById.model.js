const mongoose = require('mongoose')
const {userModel} = require('./createUser.model')
const isIdValid = require("../utils/isIdValid");

async function deleteUserByIdModel (id) {
if (typeof await isIdValid(id) === "object") {
    return Promise.reject(await isIdValid(id));
    }

    const response = await(userModel.deleteOne({_id : id}))
    return response

}

module.exports = {deleteUserByIdModel}