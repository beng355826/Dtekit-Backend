const {authoriseUserModel} = require('../validateModels/authoriseUser.model')


async function authoriseUserController (req, res, next) {

    try{
        
        const response = await authoriseUserModel(req.body)
        res.status(201).json(response)
    } catch (err) {
        next(err)
    }

}

module.exports = authoriseUserController