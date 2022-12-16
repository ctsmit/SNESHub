const React = require("react")
const DefaultLayout = require("./DefaultLayout")

class New extends React.Component {
   render() {
      const { game } = this.props
      return (
         <DefaultLayout title="Add Game to Storefront">
            <link rel="stylesheet" type="text/css" href="/css/edit.css" />

            <a style={{ textDecoration: "none" }} href="/games/">BACK</a>
            <div>
               <form action= "/games/" method="POST">
                  Name: <input type="text" name="name" defaultValue='' />
                  <br />
                  Price: <input type="text" name="price" defaultValue=""/>
                  <br />
                  Remaining: <input type="text" name="remaining" defaultValue="" />
                  <br />
                  ImageURL: <input type="text" name="img" defaultValue="https://" />
                  <br />
                  Description: <input type="text" name="description" defaultValue="" />
                  <br />
                  <input type="submit" name="" value="Add Game" />
               </form>
            </div>
         </DefaultLayout>
      )
   }
}

module.exports = New
