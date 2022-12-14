require("dotenv").config()
let express = require("express")
let app = express()
let mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URI

const Games = require("./models/Games")

app.use(methodOverride("method"))
app.use(express.urlencoded({ extended: true })) //boilerplate code

app.set("view engine", "jsx") //(specifies what you are setting, the engine(jsx,ejs,pug))
app.engine("jsx", require("express-react-views").createEngine()) //only for jsx?

// setting up mongoose------------------------------------------
mongoose.set("strictQuery", true)
mongoose.connect(
   mongoURI,
   () => {
      console.log("connected to MongoDB")
   },
   (e) => console.error(e)
)

// Seed route - populate the database for testing
app.get("/seed", (req, res) => {
   Games.create([{}], (err, date) => {
      res.redirect("/games")
   })
})
//Index  -- .get/.find /photos/         -- display a list of all
app.get("/games", (req, res) => {
   Games.find({}, (error, allPoke) => {
      res.render("Index", {
         pokemon: allPoke, // getting all items from db to pass as props
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
      res.redirect("/games") //redirect back to index
   })
})
//Update -- .put/.findByIdAndUpdate/.save() /photos/:id      -- update specific photo
app.put("/games/:id", (req, res) => {
   Games.findByIdAndUpdate(req.params.id, req.body, (err, poke) => {
      console.log(poke)
      res.redirect(`/games/${req.params.id}`) // redirecting to the Show page
   })
})
//Create -- .post/.create /photos/        -- create new photo
app.post("/games", (req, res) => {
   Games.create(req.body, (error, create) => {
      res.redirect("/games")
   })
})
//Edit   -- .get.findById /photos/:id/edit -- return a HTML form for editing photo
app.get("/games/:id/edit", (req, res) => {
   Pokemon.findById(req.params.id, (err, poke) => {
      if (!err) {
         res.render("Edit", {
            pokemon: poke, //pass in the found items so we can prefill the form
         })
      } else {
         res.send({ msg: err.message })
      }
   })
})
//Show   -- .get/.findById /photos/:id      -- display specific photo
app.get("/games/:id", (req, res) => {
   Games.findById(req.params.id, (err, poke) => {
      res.render("Show", { pokemon: poke })
   })
})

app.listen(3000, () => console.log("listening"))
