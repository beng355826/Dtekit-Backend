const { getAllUsersModel} = require('../UserModels/getAllUsers.model')

async function getAllUsersController(req,res,next) {

    try{
        const response = await getAllUsersModel()
        res.status(200).json(response)
    }
    catch(err){
        next(err)
    }    


}

module.exports = getAllUsersController