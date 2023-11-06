const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const encrypt = require('../utils/encryptPassword')
const saltRounds = 10   // the higher the number the stronger the encryption but it takes longer to encrypt 10 is standard.


const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email :{
        type : String,
        require: true
    },
    password: {
        type : String,
        required: true,
        min : 6
    }
})

mongoose.pluralize(null);  // stops the collection from being added an extra s to make it plural
const userModel = mongoose.model('users', userSchema)


async function createUserModel (req) {

    const doesEmailExit = await(userModel.findOne({email : req.body.email})) 

    if(!doesEmailExit){
        req.body.password = await encrypt(req.body.password)

        const newUser = await(userModel.create(req.body))
        return newUser
        } else {
        return Promise.reject({msg : "email already registered"})
        }

}


module.exports = {createUserModel, userModel};