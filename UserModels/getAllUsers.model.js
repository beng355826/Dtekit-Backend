const mongoose = require('mongoose')
const {userModel} = require('./createUser.model')


async function getAllUsersModel () {
 const response = await(userModel.find({}))
 return response
}

module.exports = {getAllUsersModel}