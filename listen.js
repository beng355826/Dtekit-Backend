const app = require('./app.js')
const {PORT = 9090} = process.env
const mongoDb = require('./db-cloud/mongodb.utils.js')

mongoDb.connect()

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})