const autoBind = require("auto-bind");
const visitModel = require("../../models/visit.model");
const createHttpError = require("http-errors");
const propertiesService = require("../properties/properties.service");
const customerService = require("../customer/customer.service");
const agentService = require("../agent/agent.service");

class visitService{
    #model
    #propertiesService
    #customerService
    #agentService
    constructor(){
        autoBind(this)
        this.#model = visitModel
        this.#propertiesService = propertiesService
        this.#customerService = customerService
        this.#agentService = agentService
    }
    async find(){
        const visits = await this.#model.find({},{__v : 0}).then((data)=>{if(data) return data})
        return visits
    }
    async remove(id){
        await this.checkExistById(id)
        await this.#model.deleteMany({_id: id})

    }
    async create(visitDto){
        await this.#customerService.checkExistById(visitDto.custId)
        await this.#agentService.checkExistById(visitDto.agentId)
        const property = await this.#propertiesService.checkExistById(visitDto.propId)
        if(property?.isSold){
            throw new createHttpError.NotFound("قبلا فروخته شده")
        }
        await this.#model.create(visitDto)

    }
    async checkExistById(id){
        const visit = await this.#model.findById(id)
        if(!visit) throw new createHttpError.NotFound("پیدا نشد")
        return visit
    }
}

module.exports = new visitService