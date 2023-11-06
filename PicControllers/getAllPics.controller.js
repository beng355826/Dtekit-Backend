const {getAllPicsModel} = require('../PicModels/getAllPics.model')

async function getAllPicsController (req,res,next) {

    try{
        const response = await getAllPicsModel(req.query)
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

module.exports = getAllPicsController