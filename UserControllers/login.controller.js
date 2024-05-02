const mongoose = require('mongoose')
const {loginModel} = require('../UserModels/login.model')

async function loginController (req, res, next) {
    try{
        const result = await loginModel(req.body)
        res.status(200).json(result)
    } catch (err) {
        res.status(404).json(err)
    }
}

module.exports = loginController