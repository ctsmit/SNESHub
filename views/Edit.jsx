const React = require("react")
const DefaultLayout = require("./DefaultLayout")

class Edit extends React.Component {
   render() {
      const { game } = this.props
      return (
         <DefaultLayout title="SNESHub">
         <div>
            <form action={`/games/${game.id}?method=PUT`} method="POST">
               Name: <input type="text" name="name" defaultValue={game.name}/><br />
               Price    :  <input type="text" name="price" defaultValue={game.price}/><br />
               Remaining: <input type="text" name="remaining" defaultValue={game.remaining}/><br />
               ImageURL: <input type="text" name="img" defaultValue={game.img}/><br />
               Description: <input type="text" name="description" defaultValue={game.description}/><br />
               <input type="submit" name="" value="Update Game" />
            </form>
            </div>
            </DefaultLayout>
      )
   }
}

module.exports = Edit