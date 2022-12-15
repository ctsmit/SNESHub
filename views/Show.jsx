const React = require("react")
const DefaultLayout = require("./DefaultLayout")

class Show extends React.Component {
   render() {
      const { game } = this.props
      return (
         <DefaultLayout title="SNESHub">
            <div className="item-container">
               <link rel="stylesheet" type="text/css" href="../css/show.css" />

               <div className="relative">
                  <h2>{game.name}</h2>
                  <img src={game.img} alt="uh oh" />
                  <h3>{game.price}</h3>
                  <br />
                  <h3>{`${game.remaining} available!`}</h3>
                  <p className="description">{game.description}</p>
                  
                  <form action={`/games/${game.id}?method=PUT`} method="POST">
                     <input type="submit" name="remaining" value="BUY" />
                  </form>
                  <form action={`/games/${game.id}?method=DELETE`} method="POST">
                     <input type="submit" value="DELETE" />
                  </form>
               </div>
               <a className="edit-link" href={`/games/${game.id}/edit`}>
                  Edit?
               </a>
            </div>
         </DefaultLayout>
      )
   }
}
module.exports = Show
