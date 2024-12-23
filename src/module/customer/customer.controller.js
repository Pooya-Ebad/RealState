const autoBind = require("auto-bind");
const customerService = require("./customer.service");
const httpCodes = require("http-codes");

class customerController{
    #service
    constructor(){
        autoBind(this)
        this.#service = customerService
    }
    async create(req,res,next){
        try {
            const {NationalCode , FullName , PhoneNumber , Address} = req.body
            await this.#service.create({NationalCode , FullName , PhoneNumber , Address})
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
            const customer = await this.#service.find()
            return res.status(httpCodes.FOUND).json({
                customers : customer 
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

module.exports = new customerController