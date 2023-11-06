const Multer = require('multer');
const {Storage} = require('@google-cloud/storage')
const dotenv = require('dotenv')
dotenv.config()
const multer = Multer({
    storage: Multer.memoryStorage(),       
})

let projectId = 'norse-avatar-403219'             
let keyFilename = process.env.CLOUD_STORAGE_KEY

const storage = new Storage({
    projectId,
    keyFilename                  
})


module.exports = {storage, multer};