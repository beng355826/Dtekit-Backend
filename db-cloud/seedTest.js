const bcrypt = require("bcrypt");
const saltRounds = 10;
const { userModel } = require("../UserModels/createUser.model");

async function seedUsers(testUsers) {
const promiseArray = []
for(let i = 0; i < testUsers.length; i++){

    const salt = await bcrypt.genSalt(saltRounds)
    const encryptedPassword = await bcrypt.hash(testUsers[i].password, salt)
    testUsers[i].password = encryptedPassword
    
    let promise = await userModel.create(testUsers[i])
    promiseArray.push(promise)
}
    
Promise.all(promiseArray)
.then((results) => {
    return results
})

}

module.exports = seedUsers;

