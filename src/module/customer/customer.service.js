const autoBind = require("auto-bind");
const customerModel = require("../../models/customer.model");
const createHttpError = require("http-errors");

class customerService{
    #model
    constructor(){
        autoBind(this)
        this.#model = customerModel
    }
    async find(){
        const customers = await this.#model.find({},{__v : 0}).then((data)=>{if(data) return data})

        return customers
    }
    async remove(id){
        await this.checkExistById(id)
        await this.#model.deleteMany({_id: id})

    }
    async create(customerDto){
        const customer = await this.#model.findOne({PhoneNumber : customerDto.PhoneNumber})
        const customer_ = await this.#model.findOne({ NationalCode : customerDto.NationalCode})
        if(customer || customer_){
            throw new createHttpError.NotFound("قبلا ایجاد شده")
        }
        await this.#model.create(customerDto)
    }
    async checkExistById(id){
        const customer = await this.#model.findById(id)
        if(!customer) throw new createHttpError.NotFound("مشتری یافت نشد")
        return customer
    }
    async checkExistByMobile(mobile){
        const customer = await this.#model.findOne({PhoneNumber : mobile})
        if(!customer) throw new createHttpError.NotFound("مشتری یافت نشد")
        return customer
    }
}

module.exports = new customerService