const { Router } = require("express");
const { OwnerRouter } = require("../module/owner/owner.routes");
const { agentRouter } = require("../module/agent/agent.routes");
const { customerRouter } = require("../module/customer/customer.routes");
const mainController = require("../controller/main.controller");
const { dealRouter } = require("../module/deal/deal.routes");
const { propertyRouter } = require("../module/properties/properties.routes");
const { visitRouter } = require("../module/visit/visit.routes");
const mainRoutes = Router()

mainRoutes.use("/owners", OwnerRouter)
mainRoutes.use("/agents", agentRouter)
mainRoutes.use("/deals", dealRouter)
mainRoutes.use("/visits", visitRouter)
mainRoutes.use("/properties", propertyRouter)
mainRoutes.use("/customers", customerRouter)
mainRoutes.get('/all', mainController.find)
mainRoutes.get('/',(req,res)=>{
    res.sendFile(process.cwd()+'/public/index.html')
})

module.exports = mainRoutes