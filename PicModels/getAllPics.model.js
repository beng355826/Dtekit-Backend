const {storage} = require('../db-cloud/connectCloud.model')

const bucket = storage.bucket('dtekit_pics')    

async function getAllPicsModel(query) {

let count = 0;
  const keysArr = ["year", "setting", "order" , "p"];
  Object.keys(query).forEach((key) => {
    if (!keysArr.includes(key)) {
      count++;
    }
  });

  if (count > 0) {
    return Promise.reject({errors : 400})
  }


    if(query.order){
        if(query.order !== 'desc' && query.order !== 'asc'){
           return Promise.reject({errors : 400})
        }
    }


    
    const [files] = await bucket.getFiles()

        let fileList = await Promise.all(
            files.map(async (file) => {
                const [publicUrl] = await file.getSignedUrl({
                    action : 'read',
                    expires: '01-01-2030'
                }); return {
                    name: file.name.slice(12),
                    year: file.name.slice(0,4),
                    setting: file.name.slice(4,12),
                    publicUrl
                }
            }).reverse()
        )


        if(query.order === 'asc'){
            fileList = fileList.reverse()
        }

        if(query.year){
          fileList = fileList.filter((pic) => {
                return pic.year === query.year
            })
        }
        if(query.setting){
            fileList = fileList.filter((pic) => {
                return pic.setting === query.setting
            })
        }

        if(!query.p){
            return fileList
        } else {
            const start = query.p * 10
const end = start + 10
        return fileList.slice(start,end)
        }
        

        

}

module.exports = {getAllPicsModel}

