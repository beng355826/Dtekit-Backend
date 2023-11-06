const {storage, multer} = require("../db-cloud/connectCloud.model");

const bucket = storage.bucket('dtekit_pics')    

async function uploadPicModel(file) {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

try {
    blobStream.on("finish", (data) => {
      });
     blobStream.end(file.buffer);
     return {msg: 'file uploaded'}
} catch (error) {
    console.log(error);
}

}

module.exports = { uploadPicModel };
