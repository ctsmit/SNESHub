require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URI
const methodOverride = require("method-override")

const Games = require("./models/Games")

app.use(express.urlencoded({ extended: false })) 

app.use(methodOverride("method"))
app.use(express.static("public"))

app.set("view engine", "jsx") 
app.engine("jsx", require("express-react-views").createEngine())

// setting up mongoose------------------------------------------
mongoose.set("strictQuery", false)
mongoose.connect(
   mongoURI,
   () => {
      console.log("connected to MongoDB")
   },
   (e) => console.error(e)
)

//Index  -- .get/.find /photos/         -- display a list of all
app.get("/games", (req, res) => {
   Games.find({}, (error, games) => {
      res.render("Index", {
         games: games,
      })
   })
})
//New    -- .get /photos/new      -- display HTML form for creating new
app.get("/games/new", (req, res) => {
   res.render("New")
})
//Delete -- .delete/.findByIdAndDelete /photos/:id   -- delete specific photo
app.delete("/games/:id", (req, res) => {
   Games.findByIdAndDelete(req.params.id, (err, data) => {
      res.redirect("/games")
   })
})
//Update -- .put/.findByIdAndUpdate/.save() /photos/:id      -- update specific photo
app.put("/games/:id", (req, res) => {
   if (req.body.remaining === "BUY") {
      Games.findByIdAndUpdate(req.params.id, { $inc: { remaining: -1 } }, (err, game) => {
         res.redirect(`/games/${req.params.id}`)
      })
   } else {
      Games.findByIdAndUpdate(req.params.id, req.body, (err, game) => {
         res.redirect(`/games/${req.params.id}`)
      })
   }
})
//Create -- .post/.create /photos/        -- create new photo
app.post("/games", (req, res) => {
   Games.create(req.body, (error, create) => {
      res.redirect("/games")
   })
})
//Edit   -- .get.findById /photos/:id/edit -- return a HTML form for editing photo
app.get("/games/:id/edit", (req, res) => {
   Games.findById(req.params.id, (err, game) => {
      if (!err) {
         res.render("Edit", {
            game: game,
         })
      } else {
         res.send({ msg: err.message })
      }
   })
})
//Show   -- .get/.findById /photos/:id      -- display specific photo
app.get("/games/:id", (req, res) => {
   Games.findById(req.params.id, (err, game) => {
      res.render("Show", { game: game })
   })
})

app.listen(3000, () => console.log("listening"))
