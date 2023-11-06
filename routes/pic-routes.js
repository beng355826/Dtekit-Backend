let router = require('express').Router()
const getAllPicsController = require('../PicControllers/getAllPics.controller')
const uploadPicController = require('../PicControllers/uploadPic.controller')
const {bucket, multer} = require("../db-cloud/connectCloud.model");


router.get('/pics', getAllPicsController)
router.post('/pics/upload', multer.single('image') ,uploadPicController)

module.exports = router

