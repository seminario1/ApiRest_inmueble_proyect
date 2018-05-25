'use strict'

const mogoose =require('mongoose')
const connect =  require('../../../database/collections/connect')
const Registro = require('../../../database/collections/users')
const Homes = require('../../../database/collections/casas')
const express = require('express')


const route = express.Router()


// metodos de peticion GET, POTS, PUT, DELETE

route.get('/p1', (req, res) =>{
    res.send({ menssage:'mensaja de prueba'})
})
route.get('/homes', (req, res) =>{
    res.send({ menssage:'mensaja de prueba'})
})




route.get('/list/:email', (req, res) =>{
    //res.send({ email:`${req.params.email}`,password:`${req.params.pass}`})
    console.log(req.params)
    let email =req.params.email

    Registro.find({"email":email}, (err, user) =>{
        if(err) return res.status(500).send({menssage:`Error en la peticion: ${err}`})
        if(!user) return res.status(404).send({message:`usuario no existe`})

        res.status(200).send({'email':user})
    })
})

route.get('/login/:email=:password', (req, res) =>{
    //res.send({ email:`${req.params.email}`,password:`${req.params.pass}`})
    console.log(req.params)

    let email =req.params.email
    let password=req.params.password

    Registro.find({"email":email,"password":password}, (err, user) =>{
        if(err) return res.status(500).send({menssage:`Error en la peticion: ${err}`})
        if(user.length == 0) return res.status(404).send({message:`usuario no existe`})

        res.status(200).send({'email':user})
    })
})

route.post('/registro', (req, res) =>{
    console.log('POST /api/registro')
    console.log(req.body)

    let registro = new Registro()
    registro.name =req.body.name
    registro.lastname = req.body.lastname
    registro.phone = req.body.phone
    registro.email = req.body.email
    registro.password = req.body.password


    registro.save((err, usertStored) =>{
        if(err) res.status(500).send({messaje: `Error al savar la base de datos:${err}`})

        res.status(200).send({usertStored})
    })
})

route.post('/homes', (req, res) =>{
    console.log('POST /api/homes')
    console.log(req.body)

    let homes = new Homes()
          homes.codigo = req.body.codigo,
          homes.codigoInmobiliaria=req.body.codigoInmobiliaria,
          homes.estatus = req.body.estatus,
          homes.tipo = req.body.tipo,
          homes.oferta = req.body.oferta,
          homes.estado = req.body.estado,
          homes.region = req.body.region,
          homes.ubicacion = req.body.ubicacion,
          homes.zona = req.body.zona,
          homes.direccion = req.body.direccion,
          homes.moneda = req.body.moneda,
          homes.precio = req.body.precio,
          homes.descripcion = req.body.descripcion,
          homes.fecentrega = req.body.fecentrega,
          homes.supterreno = req.body.supterreno,
          homes.servicios = req.body.servicios,
          homes.amurallado = req.body.amurallado,
          homes.desHabitacion = req.body.desHabitacion,
          homes.desBano = req.body.desBano,
          homes.supconstruida = req.body.supconstruida,
          homes.numDormitorios = req.body.numDormitorios,
          homes.dormitorios = req.body.dormitorios,
          homes.numBanios = req.body.numBanios,
          homes.banios = req.body.banios,
          homes.piso = req.body.piso,
          homes.elevador = req.body.parqueos,
          homes.numParqueos = req.body.numParqueos,
          homes.amoblado = req.body.amoblado,
          homes.fecpublicacion = req.body.fecpublicacion,
          homes.latitud = req.body.latitud,
          homes.longitud = req.body.longitud


    homes.save((err, casaStored) =>{
        if(err) res.status(500).send({messaje: `Error al savar la base de datos:${err}`})

        res.status(200).send({casaStored})
    })
})

module.exports = route
