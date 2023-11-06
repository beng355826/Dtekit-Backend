const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const connect = async () => {

    try{
      await  mongoose.connect(process.env.MONGODB_URL, {
        dbName: process.env.NODE_ENV,
        useNewUrlParser : true,
        useUnifiedTopology : true
      });
    }
    catch(err) {
        console.log(err);
        throw new Error(err)
    }

}

const disconnect = async () => {

    try{
      await mongoose.disconnect();
    }
    catch(err) {
        console.log(err);
        throw new Error(err)
    }

}

const dropCollection = async (collectionName) => {          //this drops the database when being used for testing!

    try{
        await mongoose.connection.collection(collectionName).drop()
    }
    catch (err) {
        if(err.code === 26){
            console.log('namespace %s not found', collectionName);
        } else {
            throw new Error(err);
        }
    }


}

module.exports = {
    connect,
    disconnect,
    dropCollection
}