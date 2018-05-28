'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CasasSchema = Schema({
        tipo: String,
        categoria:String,
        descripcion:String,
        precio:String,
        superficie:String,
        ano_de_construcion:String,
        cant_de_banos:String

})


module.exports = mongoose.model('Casas', CasasSchema)
