const autoBind = require("auto-bind");
const ownerService = require("./owner.service");
const httpCodes = require("http-codes");class ownerController{
    #service
    constructor(){
        autoBind(this)
        this.#service = ownerService
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
            const owner = await this.#service.find()
            return res.status(httpCodes.FOUND).json({
                owners : owner 
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

module.exports = new ownerController