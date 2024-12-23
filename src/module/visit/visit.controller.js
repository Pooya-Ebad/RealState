const autoBind = require("auto-bind");
const visitService = require("./visit.service");
const httpCodes = require("http-codes")

class visitController{
    #service
    constructor(){
        autoBind(this)
        this.#service = visitService
    }
    async create(req,res,next){
        try {
            const {custId , agentId , propId , description, visit_date} = req.body
            await this.#service.create({custId , agentId , propId , description, visit_date})
            return res.status(httpCodes.CREATED).json({
                message : "با موفقیت ایجاد شد"
            })
        } catch (error) {
            return res.status(httpCodes.CONFLICT).json({
                error
            })
        }
    }
    async find(req,res,next){
        try {
            const visit = await this.#service.find()
            return res.status(httpCodes.FOUND).json({
                visits : visit 
            })
        } catch (error) {
            next(error)
        }
    }
    async remove(req,res,next){
        try {
            const {id} = req.params
            await this.#service.remove(id)
            return res.json({
                message : "پاک شد",
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new visitController