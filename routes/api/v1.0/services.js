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


//listar todas las casas
route.get('/homes', (req, res) =>{
  Homes.find({}).exec( (error, docs) => {
    res.status(200).send(docs);
  })
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
<<<<<<< HEAD

    Registro.findOne({'email':registro.email},(err,e)=>{
        if(e){
            console.log('email repetido')
            res.status(404).send({message:`Este email ${registro.email} ya se encuentra registrado`})
        }
        else{
            registro.save((err, usertStored) =>{
                if(err) res.status(404).send({messaje: `Error al salvar la base de datos:${err}`})
                console.log(err)
          
                res.status(200).send({usertStored})
            })
        }

        //res.status(404).send
    })

             
=======


    registro.save((err, usertStored) =>{
        if(err) res.status(500).send({messaje: `Error al savar la base de datos:${err}`})

        res.status(200).send({usertStored})
    })
})
// llenar casas
route.post('/homes', (req, res) =>{
    console.log('POST /api/homes')
    console.log(req.body)

    let homes = new Homes()
          homes.tipo = req.body.tipo
          homes.categoria = req.body.categoria
          homes.descripcion = req.body.descripcion
          homes.precio = req.body.precio
          homes.superficie = req.body.superficie
          homes.ano_de_construcion = req.body.ano_de_construcion
          homes.cant_de_banos = req.body.cant_de_banos




    homes.save((err, casaStored) =>{
        if(err) res.status(500).send({messaje: `Error al savar la base de datos:${err}`})

        res.status(200).send({casaStored})
    })
>>>>>>> f486f65f04c5e9eacff3fa8e1aa459d3047e5b22
})

module.exports = route
