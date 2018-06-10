'use strict'

const mogoose =require('mongoose')
const connect =  require('../../../database/collections/connect')
const Registro = require('../../../database/collections/users')
const Homes = require('../../../database/collections/casas')

// hom  p
const Home = require('../../../database/collections/homes')
const Img = require('../../../database/collections/img')
const express = require('express')

const multer = require('multer');
const fs = require('fs')


const route = express.Router()

// metodos de peticion GET, POTS, PUT, DELETE

route.get('/', (req, res) =>{
    res.send({ menssage:'SERVICIO API-RES INMUEBLE'})
})

//////////////list of homes//////////////
var storage = multer.diskStorage({
    destination: "./public/avatars",
    filename: function (req, file, cb) {
      console.log("-------------------------");
      console.log(file);
      cb(null, "IMG_" + Date.now() + ".jpg");
    }
  });
  var upload = multer({
    storage: storage
  }).single("img");;



  route.post('/homeimg', (req, res) => {
    //var url = req.url;
    //console.log(url);
    var id = homeid;
    upload(req, res, (err) => {
      if (err) {
        res.status(500).json({
          "msn" : "No se ha podido subir la imagen"
        });
      } else {
        var ruta = req.file.path.substr(6, req.file.path.length);
        console.log(ruta);
        var img = {
          idhome: id,
          name : req.file.originalname,
          physicalpath: req.file.path,
          relativepath: "http://192.168.1.5:4043" + ruta
        };
        var imgData = new Img(img);
        imgData.save().then( (infoimg) => {
          //content-type
          //Update User IMG
          var home = {
            gallery: new Array()
          }
          Home.findOne({_id:id}).exec( (err, docs) =>{
            console.log(docs);
            var data = docs.gallery;
            var aux = new  Array();
            if (data.length == 1 && data[0] == "") {
              home.gallery.push("http://192.168.1.5:4030/api/v1.0/homeimg/" + infoimg._id)
            } else {
              aux.push("http://192.168.1.5:4030/api/v1.0/homeimg/" + infoimg._id);
              data = data.concat(aux);
              home.gallery = data;
            }
            Home.findOneAndUpdate({_id : id}, home, (err, params) => {
                if (err) {
                  res.status(500).json({
                    "msn" : "error en la actualizacion del usuario"
                  });
                  return;
                }
                res.status(200).json(
                  req.file
                );
                return;
            });
          });
        });
      }
    });
  });
  route.get(/homeimg\/[a-z0-9]{1,}$/, (req, res) => {
    var url = req.url;
    var id = url.split("/")[2];
    console.log(id)
    Img.findOne({_id: id}).exec((err, docs) => {
      if (err) {
        res.status(500).json({
          "msn": "Sucedio algun error en el servicio"
        });
        return;
      }
      //regresamos la imagen deseada
      var img = fs.readFileSync("./" + docs.physicalpath);
      //var img = fs.readFileSync("./public/avatars/img.jpg");
      res.contentType('image/jpeg');
      res.status(200).send(img);
    });
  });
  

  var homeid;
  route.post("/home", (req, res) => {
    //Ejemplo de validacion
    if (req.body.name == "" && req.body.email == "") {
      res.status(400).json({
        "msn" : "formato incorrecto"
      });
      return;
    }
    var home = {
      street : req.body.street,
      descripcion : req.body.descripcion,
      price : req.body.price,
      lat : req.body.lat,
      lon : req.body.lon,
      neighborhood : req.body.neighborhood,
      city : req.body.city,
      gallery: "",
      contact: req.body.contact
    };
  
    var homeData = new Home(home);
  
    homeData.save().then( (rr) => {
      //content-type
      homeid=rr._id;                           //variable que guarda el id de home
      res.status(200).json({
        "id" : rr._id,
        "msn" : "usuario Registrado con exito "
      });
    });
  });
  
  route.get("/home", (req, res, next) => {
        Home.find({}).exec( (error, docs) => {
          res.status(200).json(
            {
              info: docs
            }
          );
        })
  });
  
///////////////// end homes/////////////////



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
})

module.exports = route
