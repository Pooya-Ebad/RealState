const autoBind = require("auto-bind");
const dealService = require("./deal.service");
const httpCodes = require("http-codes")

class dealController{
    #service
    constructor(){
        autoBind(this)
        this.#service = dealService
    }
    async create(req,res,next){
        try {
            const {custId , agentId , propId , finalPrice, description, deal_date} = req.body
            await this.#service.create({custId , agentId , propId , finalPrice, description, deal_date})
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
            const deal = await this.#service.find()
            return res.status(httpCodes.FOUND).json({
                deals : deal 
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

module.exports = new dealController