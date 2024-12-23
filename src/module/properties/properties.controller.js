const autoBind = require("auto-bind");
const propertyService = require("./properties.service");
const httpCodes = require("http-codes");

class propertyController{
    #service
    constructor(){
        autoBind(this)
        this.#service = propertyService
    }
    async create(req,res,next){
        try {
            const {Type , Status , PostalCode , Address, YearOf, Price, Description, ownerId} = req.body
            await this.#service.create({Type , Status , PostalCode , Address, YearOf, Price, Description, ownerId})
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
            const property = await this.#service.find()
            return res.status(httpCodes.FOUND).json({
                properties : property 
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

module.exports = new propertyController