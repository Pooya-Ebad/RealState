const { Router } = require("express");
const { OwnerRouter } = require("../module/owner/owner.routes");
const { agentRouter } = require("../module/agent/agent.routes");
const { customerRouter } = require("../module/customer/customer.routes");
const mainController = require("../controller/main.controller");
const { dealRouter } = require("../module/deal/deal.routes");
const { propertyRouter } = require("../module/properties/properties.routes");
const { visitRouter } = require("../module/visit/visit.routes");
const mainRoutes = Router()

mainRoutes.use("/owner", OwnerRouter)
mainRoutes.use("/agent", agentRouter)
mainRoutes.use("/deal", dealRouter)
mainRoutes.use("/visit", visitRouter)
mainRoutes.use("/properties", propertyRouter)
mainRoutes.use("/customer", customerRouter)
mainRoutes.get('/all', mainController.find)

module.exports = mainRoutes