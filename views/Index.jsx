const React = require("react")

class Index extends React.Component {
   render() {
      const { games } = this.props
      return (
         <div class="item-container">
         <link rel="stylesheet" type="text/css" href="../css/index.css" />

            {games.map((game, i) => {
               return (
                  <div>
                     <h5>{game.name}</h5>
                     <a href={`games/${game.id}`}><img src={game.img} alt="uh oh" /></a>
                     <h4>{game.price}</h4>
                  </div>
               )
            })}
         </div>
      )
   }
}
module.exports = Index
