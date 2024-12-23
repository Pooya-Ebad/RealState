const express = require("express")
const dotenv = require("dotenv")


const bodyParser = require('body-parser');
const mainRoutes = require("./src/router/main.router");
// const expressEjsLayouts = require("express-ejs-layouts")

dotenv.config()

async function main(){
    const app = express()    
    const port = process.env.PORT
    require("./mongodb.config")
    app.use(express.json())
    app.use(express.urlencoded({extended : false}))
    // app.use(express.static("public"))
    // app.use(expressEjsLayouts)
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.set('view engine', 'ejs')
    // app.set('layout', './layouts/panel/main.ejs')
    // app.set("layout extractScripts", true)
    // app.set("layout extractStyles", true)
    app.use(mainRoutes)
    app.listen(port,()=>{
        console.log(`server : http://localhost:${port}`);
    })
}
main()