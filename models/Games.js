const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
   name: String,
   price: String,
   remaining: Number,
   img: String,
   description: String
})

module.exports = mongoose.model('Games', gameSchema)