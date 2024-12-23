const { Router } = require("express");
const dealController = require("./deal.controller");

const router = Router()

router.post("/",dealController.create)
router.get("/all",dealController.find)
router.delete("/:id",dealController.remove) 

module.exports = {
    dealRouter : router
}