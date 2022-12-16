const React = require("react")
const DefaultLayout = require("./DefaultLayout")

class Show extends React.Component {
   render() {
      const { game } = this.props
      return (
         <DefaultLayout title="SNESHub">
            <a style={{ textDecoration: "none" }} href="/games/">BACK</a>

            <div className="item-container">
               <link rel="stylesheet" type="text/css" href="/css/show.css" />

               <div className="relative item">
                  <h2>{game.name}</h2>
                  <img src={game.img} alt="your image is broken" />
                  <h3>{game.price}</h3>
                  <br />

                  {game.remaining > 0 ? <h3>{game.remaining} available!</h3> : <h3>Sold Out!!</h3>}

                  <p className="description">{game.description}</p>

                  {game.remaining > 0 && (
                     <form action={`/games/${game.id}?method=PUT`} method="POST">
                        <input className="buy-button" type="submit" name="remaining" value="BUY" />
                     </form>
                  )}
               </div>
               <a style={{ textDecoration: "none" }} className="edit-link" href={`/games/${game.id}/edit`}>
                  Edit?
               </a>
               <form action={`/games/${game.id}?method=DELETE`} method="POST">
                  <input className="delete-button" type="submit" value="DELETE" />
               </form>
            </div>
         </DefaultLayout>
      )
   }
}
module.exports = Show
