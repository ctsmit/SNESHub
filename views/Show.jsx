const React = require("react")
const DefaultLayout = require("./DefaultLayout")

class Show extends React.Component {
   render() {
      const { game } = this.props
      return (
         <DefaultLayout title="SNESHub">
            <link rel="stylesheet" type="text/css" href="/css/show.css" />
            <form action="/games/"><button className="btn">Home</button></form>

            <div className="relative item">
               <h2>{game.name}</h2>
               {game.img.includes("https://") ? (
                  <img src={game.img} alt=" image is broken" />
               ) : (
                  <img
                     src="https://www.giantbomb.com/a/uploads/original/8/87790/2879484-smw_jpnbox.png"
                     alt="image is broken"
                  />
               )}
               <p>{game.price}</p>
               <br />

               {game.remaining > 0 ? (
                  <p className="remain">{game.remaining} available!</p>
               ) : (
                  <p className="remain">Sold Out!!</p>
               )}

               <p className="description">{game.description}</p>
               <br />
               {game.remaining > 0 && (
                  <form action={`/games/${game.id}?method=PUT`} method="POST">
                     <input className="btn buy-button" type="submit" name="remaining" value="BUY" />
                  </form>
               )}
            </div>
            <form action={`/games/${game.id}/edit`}>
               <button className="btn">Edit Item?</button>
            </form>
            <form action={`/games/${game.id}?method=DELETE`} method="POST">
               <input className="btn" type="submit" value="DELETE" />
            </form>
         </DefaultLayout>
      )
   }
}
module.exports = Show
