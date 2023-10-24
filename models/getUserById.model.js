const mongoose = require('mongoose')
const {userModel} = require('./createUser.model')

async function getUserByIdModel (param) {

isIdValid = /^[0-9a-fA-F]{24}$/.test(param)

if(isIdValid){
    const response = await(userModel.find({_id : param }))
    if(response.length === 0) return Promise.reject({status : 404})
    return response
} else {
   return Promise.reject({msg: 'id not valid'})
}

}

module.exports = {getUserByIdModel}