
const {error400, error404 ,error500} = require('./error-handling')
const express = require('express')
const app = express()
const userRoutes = require('./routes/user-routes')
const endpointRoute = require('./routes/endpoint-route')


app.use(express.json())
app.use('/api', endpointRoute), 
app.use('/api', userRoutes)

app.use(error400)
app.use(error404)
app.use(error500)


module.exports = app