'use strict'

const express = require('express')
const route = express.Router()

route.get('/p1', (req, res) =>{
    res.send({ menssage:'mensaja de prueba'})
})



module.exports = route