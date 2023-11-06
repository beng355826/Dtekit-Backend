const {createUserModel} = require('../UserModels/createUser.model');


async function createUser (req,res,next) {
    
    try{
        const response = await createUserModel(req)
        res.status(201).json(response)
    }
    catch (err) {
        next(err)
    }


}

module.exports = createUser