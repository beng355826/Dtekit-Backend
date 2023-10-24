const mongoose = require('mongoose')
const {userModel} = require('./createUser.model')

async function deleteUserByIdModel (id) {

isIdValid = /^[0-9a-fA-F]{24}$/.test(id)
console.log(id);
if(isIdValid){
    const response = await(userModel.deleteOne({_id : id}))
    console.log(response);

    if(response.deletedCount !== 1) return Promise.reject({status : 404})
    return response
    

} else {
   return Promise.reject({msg: 'id not valid'})
}



}

module.exports = {deleteUserByIdModel}