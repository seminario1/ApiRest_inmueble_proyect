'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CasasSchema = Schema({
    casa: String,
    id:String



})


module.exports = mongoose.model('Casas', CasasSchema)
