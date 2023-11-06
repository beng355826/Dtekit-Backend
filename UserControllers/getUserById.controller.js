const { error } = require('@hapi/joi/lib/base');
const {getUserByIdModel} = require('../UserModels/getUserById.model')

async function getUserByIdController (req,res,next) {

    try{
        const response = await getUserByIdModel(req.params.id)
        res.status(200).json(response)
    } 
    catch(err){
        next(err)
    }
    


}

module.exports = getUserByIdController