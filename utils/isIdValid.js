const {userModel} = require('../models/createUser.model')
const mongoose = require('mongoose')


async function isIdValid (id) {
    
   const isValid = /^[0-9a-fA-F]{24}$/.test(id)
if(isValid){
    const response = await(userModel.find({_id : id }))
    if(response.length === 0) return {status : 404}
    return true
} else {
   return {msg: 'id not valid'}
}

}


module.exports = isIdValid