const React = require("react")

class Show extends React.Component {
   render() {
      const { game } = this.props
      return (
         <div>
         <link rel="stylesheet" type="text/css" href="../css/show.css" />
            
            <div>
               <h2>{game.name}</h2>
               <img src={game.img} alt="uh oh" />
               <h3>{game.price}</h3>
            </div>
            <h3>{`${game.remaining} available!`}</h3>
            <form action={`/pokemon/${game.id}?method=PUT`} method="POST">
               <input type="submit" value="BUY" />
            </form>
            <form action={`/pokemon/${game.id}?method=DELETE`} method="POST">
               <input type="submit" value="DELETE" />
            </form>
         </div>
      )
   }
}
module.exports = Show
