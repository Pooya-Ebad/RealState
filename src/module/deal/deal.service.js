const autoBind = require("auto-bind");
const dealModel = require("../../models/deal.model");
const createHttpError = require("http-errors");
const propertiesService = require("../properties/properties.service");
const customerService = require("../customer/customer.service");
const agentService = require("../agent/agent.service");

class dealService{
    #model
    #propertiesService
    #customerService
    #agentService
    constructor(){
        autoBind(this)
        this.#model = dealModel
        this.#propertiesService = propertiesService
        this.#customerService = customerService
        this.#agentService = agentService
    }
    async find(){
        const deals = await this.#model.find({},{__v : 0}).then((data)=>{if(data) return data})
        return deals
    }
    async remove(id){
        await this.checkExistById(id)
        await this.#model.deleteMany({_id: id})

    }
    async create(dealDto){
        await this.#customerService.checkExistById(dealDto.custId)
        await this.#agentService.checkExistById(dealDto.agentId)
        const property = await this.#propertiesService.checkExistById(dealDto.propId)
        if(property?.isSold){
            throw new createHttpError.NotFound("قبلا فروخته شده")
        }
        await this.#model.create(dealDto)
        await this.#propertiesService.update(dealDto.propId)

    }
    async checkExistById(id){
        const deal = await this.#model.findById(id)
        if(!deal) throw new createHttpError.NotFound("پیدا نشد")
        return deal
    }
}

module.exports = new dealService