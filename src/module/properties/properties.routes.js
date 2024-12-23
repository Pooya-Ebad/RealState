const { Router } = require("express");
const propertiesController = require("./properties.controller");

const router = Router()

router.post("/",propertiesController.create)
router.get("/all",propertiesController.find)
router.delete("/:id",propertiesController.remove) 

module.exports = {
    propertyRouter : router
}