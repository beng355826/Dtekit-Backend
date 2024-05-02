const mongoose = require('mongoose')
const { userModel } = require('./createUser.model')
const bcrypt = require('bcrypt')


async function loginModel (body) {
const user = await userModel.findOne({email :body.email})

console.log(user, '<-----');

if(user){
    const validatePassword = await bcrypt.compare(body.password, user.password)
    if(validatePassword){
        console.log(validatePassword);
        return user
    } else {
        console.log('object');
        return Promise.reject({msg: 'not valid password'})
    }
} else {
   return Promise.reject({msg: 'not valid user'})
}

}

module.exports = {loginModel}


