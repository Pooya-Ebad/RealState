const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors');


const bodyParser = require('body-parser');
const mainRoutes = require("./src/router/main.router");
// const expressEjsLayouts = require("express-ejs-layouts")

dotenv.config()

async function main(){
    const app = express()    
    const port = process.env.PORT
    require("./mongodb.config")
    app.use(express.json())
    app.use(cors());
    app.use(express.urlencoded({extended : false}))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(mainRoutes)
    app.use(express.static(process.cwd()+"/public")) 
    app.listen(port,()=>{
        console.log(`server : http://localhost:${port}`);
    })
}
main()