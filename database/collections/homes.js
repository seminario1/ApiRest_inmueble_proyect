'use strict'

const mongoose = require('mongoose');
var mon = require('mongoose');

var Schema = mon.Schema;
var homeSchema = new Schema({
  city : String,
  estado :String,
  cuartos : Number,
  baños: Number,
  superficie : Number,
  antiguedad : Number,
  street : String,
  descripcion : String,
  price : Number,
  lat : Number,
  lon : Number,
  neighborhood : String,
  gallery : Array,
  contact : Number
});
var home = mongoose.model("user", homeSchema);
module.exports = home;
