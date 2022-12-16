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
                        <a href={`/games/${game.id}`}>
                           {game.img.includes("http") ? (
                              <img src={game.img} alt=" image is broken" />
                           ) : (
                              <img
                                 src="https://www.giantbomb.com/a/uploads/original/8/87790/2879484-smw_jpnbox.png"
                                 alt="image is broken"
                              />
                           )}
                        </a>
                        <h4>{game.price}</h4>
                     </div>
                  )
               })}
            </div>
            <form action={`/games/new`}><button className="btn">Add Game</button></form>
         </body>
      )
   }
}
module.exports = Index
