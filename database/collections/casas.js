'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CasasSchema = Schema({
        codigo: String,
        codigoInmobiliaria: String,
        estatus: String,
        tipo: String,
        oferta: String,
        estado: String,
        region: String,
        ubicacion: String,
        zona: String,
        direccion: String,
        moneda: String,
        precio: Number,
        descripcion: String,
        fecentrega: String,
        supterreno: Number,
        servicios: String,
        amurallado: String,
        desHabitacion: String,
        desBano: String,
        supconstruida: Number,
        numDormitorios: Number,
        dormitorios: String,
        numBanios: Number,
        banios: String,
        piso: Number,
        elevador: String,
        piscina: String,
        parqueos: String,
        numParqueos: Number,
        amoblado: String,
        fecpublicacion: Date,
        latitud: Number,
        longitud: Number

})


module.exports = mongoose.model('Casas', CasasSchema)
