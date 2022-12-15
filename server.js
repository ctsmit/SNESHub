require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URI
const methodOverride = require("method-override")

const Games = require("./models/Games")

app.use(methodOverride("method"))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false })) //boilerplate code
// app.use('/public',express.static('public'));

app.set("view engine", "jsx") //(specifies what you are setting, the engine(jsx,ejs,pug))
app.engine("jsx", require("express-react-views").createEngine()) //only for jsx?

// setting up mongoose------------------------------------------
mongoose.set("strictQuery", false)
mongoose.connect(
   mongoURI,
   () => {
      console.log("connected to MongoDB")
   },
   (e) => console.error(e)
)

// Seed route - populate the database for testing
// app.get("/seed", (req, res) => {
//    Games.create([
//       {
//       name: "F-Zero",
//       price: "$24.98",
//       remaining: 13,
//       img: "https://www.giantbomb.com/a/uploads/original/2/23093/2944743-4425844715-50735.jpg",
//       description: "Nintendo's flagship futuristic racing game featuring the raw new power of \"Mode 7\" technology, which gives players the illusion of dangerous high-speed racing at over 200 mph!"
//       },
//       {
//       name: "Star Fox",
//       price: "$36.21",
//       remaining: 16,
//       img: "https://www.giantbomb.com/a/uploads/original/9/93770/2364788-snes_starfox.jpg",
//       description: "As the leader of an elite squad of anthropomorphic animal pilots, fly throughout the Lylat star system in the prototype Arwing spacecraft to prevent the galactic conquest of a mad scientist in this 3D shooter for the SNES (with real-time polygonal graphics powered by the new Super FX chip)."
//       },
//       {
//       name: "Super Mario Kart",
//       price: "$27.90",
//       remaining: 20,
//       img: "https://www.giantbomb.com/a/uploads/scale_super/9/93770/2364824-snes_supermariokart.jpg",
//       description: "The first installment in the long-running Mario Kart franchise features eight iconic characters from the Mario universe."
//       },
//       {
//       name: "Super Mario World",
//       price: "$38.49",
//       remaining: 6,
//       img: "https://www.giantbomb.com/a/uploads/scale_super/9/93770/2364833-snes_supermarioworld.jpg",
//       description: "One of the few launch titles of the SNES (and bundled with the system in North America and Europe), the fifth main game in the Super Mario series brings the Mario brothers into the mysterious Dinosaur Land. It marks the first appearance of Mario's dinosaur companions, known as Yoshi."
//       },
//        {
//       name: "Super Mario World 2: Yoshi's Island",
//       price: "$38.47",
//       remaining: 8,
//       img: "https://www.giantbomb.com/a/uploads/original/9/93770/2364715-snes_yoshis_island.jpg",
//       description: "A spin-off of the Super Mario platforming series, Yoshi's Island puts players in control of a tribe of Yoshies as they guide the infant Mario past the forces of the evil Kamek."
//       },
//       {
//       name: "Super Metroid",
//       price: "$21.24",
//       remaining: 15,
//       img: "https://www.giantbomb.com/a/uploads/scale_super/9/93770/2364836-snes_supermetroid.jpg",
//       description: "Super Metroid is the third game in the Metroid series and the only Metroid game to be released on the Super Nintendo. It has become widely revered for its gameplay, atmosphere, and environmental storytelling, and continues to inspire many action-adventure games."
//       },
//       {
//       name: "The Legend of Zelda: A Link to the Past",
//       price: "$37.94",
//       remaining: 9,
//       img: "https://www.giantbomb.com/a/uploads/scale_super/9/93770/2363926-snes_thelegendofzeldaalinktothepast.jpg",
//       description: "The third installment in the Zelda series makes a return to the top-down 2D gameplay of the original. Link must travel between the Light and Dark Worlds in order to set things right in the kingdom of Hyrule."
//       },
     
     
//    ],
//       (err, date) => {
//       res.redirect("/games")
//    })
// })
//Index  -- .get/.find /photos/         -- display a list of all
app.get("/games", (req, res) => {
   Games.find({}, (error, games) => {
      res.render("Index", {
         games: games, // getting all items from db to pass as props
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
   Games.findByIdAndUpdate(req.params.id, req.body, (err, game) => {
      console.log(game)
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
   Games.findById(req.params.id, (err, game) => {
      if (!err) {
         res.render("Edit", {
            game: game, //pass in the found items so we can prefill the form
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
