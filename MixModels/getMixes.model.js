const {storage} = require('../db-cloud/connectCloud.model')
const bucket = storage.bucket('dtekit_mixes')    

async function getMixesModel (query) {

    let count = 0;
  const keysArr = ["year"];
  Object.keys(query).forEach((key) => {
    if (!keysArr.includes(key)) {
      count++;
    }
  });

  if (count > 0) {
    return Promise.reject({errors : 400})
  }

    const [files] = await bucket.getFiles()

        const fileList = await Promise.all(
            files.map(async (file) => {
                const [publicUrl] = await file.getSignedUrl({
                    action : 'read',
                    expires: '01-01-2030'
                }); return {
                    name : file.name.slice(7),
                    year : file.name.slice(0,4),
                    publicUrl
                }
            })
        )

        if(query.year){
            const byYear = fileList.filter((mix) => {
                return mix.year === query.year
            })
            return byYear
        }

        return fileList

}


module.exports = {getMixesModel}