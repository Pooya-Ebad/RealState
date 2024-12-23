const autoBind = require("auto-bind");
const propertyModel = require("../../models/properties.model");
const createHttpError = require("http-errors");
//
class propertiesService{
    #model
    constructor(){
        autoBind(this)
        this.#model = propertyModel
    }
    async find(){
        const properties = await this.#model.find({},{__v : 0}).then((data)=>{if(data) return data})
        return properties
    }
    async remove(id){
        await this.checkExistById(id)
        await this.#model.deleteMany({_id: id})

    }
    async update(id){
        await this.#model.updateOne({_id: id},{isSold : true})
    }
    async create(propertyDto){
        const property = await this.#model.findOne({PostalCode : propertyDto.PostalCode})
        if(property){
            throw new createHttpError.NotFound("قبلا ایجاد شده")
        }
        await this.#model.create(propertyDto)
    }
    async checkExistById(id){
        const property = await this.#model.findById(id)
        if(!property) throw new createHttpError.NotFound("ساختمان پیدا نشد")
        return property
    }
}

module.exports = new propertiesService