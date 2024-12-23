const { Router } = require("express");
const agentController = require("./agent.controller");
const router = Router()

router.post("/",agentController.create)
router.get("/all",agentController.find)
router.delete("/:id",agentController.remove) 

module.exports = {
    agentRouter : router
}