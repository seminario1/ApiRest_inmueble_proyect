'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 4030 

//const service = require('./routes/api/v1.0')
const service = require('./routes/api/v1.0/services')

//servicios del api-rset
app.use('/api/v1.0/',service)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(service)

app.listen(port, () => {
    console.log(`Api-rest inmueble corriendo en http://localhost:${port}`)
}) 

module.exports = app