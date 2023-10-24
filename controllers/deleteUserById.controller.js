const {deleteUserByIdModel} = require('../models/deleteUserById.model')

async function deleteUserByIdController (req,res,next) {
    
    console.log(req.params);
    
    try{
    const response = await deleteUserByIdModel(req.params.id)
    res.status(204).json(response)
    }
    catch(err) {
        next(err)
    }
    

}

module.exports = deleteUserByIdController