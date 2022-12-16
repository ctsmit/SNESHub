const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
   name: { type: String, required: true },
   price: { type: String, required: true },
   remaining: { type: Number, required: true },
   img: String,
   description: { type: String, required: true },
})

module.exports = mongoose.model("Games", gameSchema)
