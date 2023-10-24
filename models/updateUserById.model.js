const mongoose = require('mongoose')
const {userModel} = require('./createUser.model')

async function updateUserByIdModel (id, body) {

    const response = await(userModel.findByIdAndUpdate(id, body,{
        useFindAndModify:false,
        new: true
    })
)

    return response

}

module.exports = {updateUserByIdModel}