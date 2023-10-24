// mongodb+srv://bennyg:O6IkDI0AozxgRmS8@cluster0.gc8yylu.mongodb.net/?retryWrites=true&w=majority
const {error400, error404 ,error500} = require('./error-handling')
const express = require('express')
let PORT = 9090
const app = express()
const apiRoutes = require('./routes/api-routes')
const mongoDb = require('./mongodb/mongodb.utils')

app.use(express.json())
app.use('/api', apiRoutes)

mongoDb.connect()

app.use(error400)
app.use(error404)
app.use(error500)


module.exports = app