const {createUserModel} = require('../models/createUser.model');


async function createUser (req,res,next) {
    
    try{
        const response = await createUserModel(req)
        res.status(200).json(response)
    }
    catch (err) {
        next(err)
    }


}

module.exports = createUser