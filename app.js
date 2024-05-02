const {error400, error404 ,error500, error403} = require('./error-handling')
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/user-routes')
const endpointRoute = require('./routes/endpoint-route')
const picRoutes = require('./routes/pic-routes')
const validateRoutes = require('./routes/validate-routes')
const getMixesController = require('./MixControllers/getMixes.controller')

app.use(cors())

app.use(express.json())

app.use('/api', endpointRoute), 
app.use('/api', userRoutes)
app.use('/api', picRoutes)
app.use('/api', validateRoutes)
app.get('/api/mixes', getMixesController)


app.use(error400)
app.use(error403)
app.use(error404)
app.use(error500)

module.exports = app





