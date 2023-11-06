const Multer = require('multer');
const {Storage} = require('@google-cloud/storage')

const multer = Multer({
    storage: Multer.memoryStorage(),       
})

let projectId = 'norse-avatar-403219'             
let keyFilename = '/Users/bennygreen/Documents/Dtekit-Backend/norse-avatar-403219-8d0df66de38b.json'

const storage = new Storage({
    projectId,
    keyFilename                  
})


module.exports = {storage, multer};