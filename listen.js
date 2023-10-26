const app = require('./app.js')
const {PORT = 9090} = process.env
const mongoDb = require('./mongodb/mongodb.utils')

mongoDb.connect()

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})