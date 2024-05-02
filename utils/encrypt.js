const bcrypt = require('bcrypt')
const saltRounds = 10  


async function encrypt(password) {

    const salt = await bcrypt.genSalt(saltRounds)
    const encryptedPassword = await bcrypt.hash(password,salt)
    return encryptedPassword

}

module.exports = encrypt