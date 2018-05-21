'use strict'

const mogoose =require('mongoose')
const connect =  require('../../../database/collections/connect')
const Registro = require('../../../database/collections/users')
const express = require('express')


const route = express.Router()


// metodos de peticion GET, POTS, PUT, DELETE

route.get('/p1', (req, res) =>{
    res.send({ menssage:'mensaja de prueba'})
})

route.post('/registro', (req, res) =>{
    console.log('POST /api/registro')
    console.log(req.body)

    let registro = new Registro()
    registro.name =req.body.name
    registro.lastname = req.body.lastname
    registro.email = req.body.email
    registro.password = req.body.password
    registro.imguser = req.body.imguser

    registro.save((err, usertStored) =>{
        if(err) res.status(500).send({messaje: `Error al savar la base de datos:${err}`})
  
        res.status(200).send({usertStored})
    })         
})

module.exports = route