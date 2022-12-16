const React = require("react")
const DefaultLayout = require("./DefaultLayout")

class Index extends React.Component {
   render() {
      const { games } = this.props
      return (
         <body>
         <link rel="stylesheet" type="text/css" href="/css/index.css" />
         <h1>SNESHub</h1>
         <div className="item-container">

            {games.map((game, i) => {
               return (
                  <div className="item">
                     <h5>{game.name}</h5>
                     <a href={`/games/${game.id}`}><img src={game.img} alt="your image is broken" /></a>
                     <h4>{game.price}</h4>
                  </div>
               )
            })}
            </div>
            <a style={{ textDecoration: "none" }} href="/games/new">
               Add Game?
            </a>
            </body>
      )
   }
}
module.exports = Index
