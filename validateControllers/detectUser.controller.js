const {detectUserModel} = require('../validateModels/detectUser.model')



async function detectUserController (req, res, next) {

    try{
        const response = await detectUserModel(req)
        res.status(201).json(response)
    } catch (err) {
        next(err)
    }

}

module.exports = detectUserController