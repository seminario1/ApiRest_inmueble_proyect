'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CasasSchema = Schema({
        tipo: String,
        categoria:String,
        descripcion:String,
        precio:Number,
        superficie:Number,
        ano_de_construcion:Number,
        cant_de_banos:Number

})


module.exports = mongoose.model('Casas', CasasSchema)
