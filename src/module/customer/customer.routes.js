const { Router } = require("express");
const customerController = require("./customer.controller");
const router = Router()

router.post("/",customerController.create)
router.get("/all",customerController.find)
router.delete("/:id",customerController.remove) 

module.exports = {
    customerRouter : router
}