const { Router } = require("express");
const visitController = require("./visit.controller");

const router = Router()

router.post("/",visitController.create)
router.get("/all",visitController.find)
router.delete("/:id",visitController.remove) 

module.exports = {
    visitRouter : router
}