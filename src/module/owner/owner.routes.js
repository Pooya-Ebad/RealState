const { Router } = require("express");
const ownerController = require("./owner.controller");

const router = Router()

router.post("/",ownerController.create)
router.get("/all",ownerController.find)
router.delete("/:id",ownerController.remove) 

module.exports = {
    OwnerRouter : router
}