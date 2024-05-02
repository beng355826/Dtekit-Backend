const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const encrypt = require('../utils/encrypt')
const saltRounds = 10   // the higher the number the stronger the encryption but it takes longer to encrypt 10 is standard.


const userSchema = mongoose.Schema({

    email :{
        type : String,
        require: true
    },
    password: {
        type : String,
        required: true,
        min : 6
    },
    accountStatus: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
})

mongoose.pluralize(null);  // stops the collection from being added an extra s to make it plural
const userModel = mongoose.model('users', userSchema)


async function createUserModel (req) {

    if(Object.keys(req.body).length < 3){
        return Promise.reject({msg: "400 - needs an email,password and accountStatus to create user"})
    }

    const doesEmailExist = await(userModel.findOne({email : req.body.email})) 
    if(!doesEmailExist){
        req.body.password = await encrypt(req.body.password)
        req.body.email = await encrypt(req.body.email)
        const newUser = await(userModel.create(req.body))
        return newUser
        } else {
        return Promise.reject({msg : "email already registered"})
        }

}


module.exports = {createUserModel, userModel};