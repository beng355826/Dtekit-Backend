const {getMixesModel} = require('../MixModels/getMixes.model')

async function getMixesController (req,res,next) {


    try {
        const response = await getMixesModel(req.query)
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }

}

module.exports = getMixesController;