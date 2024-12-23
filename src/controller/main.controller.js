const autoBind = require("auto-bind");
const httpCodes = require("http-codes");
const agentService = require("../module/agent/agent.service");
const ownerService = require("../module/owner/owner.service");
const visitService = require("../module/visit/visit.service");
const dealService = require("../module/deal/deal.service");
const propertiesService = require("../module/properties/properties.service");
const customerService = require("../module/customer/customer.service");

class mainController{
    #agentService
    #ownerService
    #visitService
    #dealService
    #propertiesService
    #customerService
    constructor(){
        autoBind(this)
        this.#agentService = agentService
        this.#ownerService = ownerService
        this.#visitService = visitService
        this.#dealService = dealService
        this.#propertiesService = propertiesService
        this.#customerService = customerService
    }
    async find(req,res,next){
        try {
            const agent = await this.#agentService.find()
            const owner = await this.#ownerService.find()
            const visit = await this.#visitService.find()
            const deal = await this.#dealService.find()
            const property = await this.#propertiesService.find()
            const customer = await this.#customerService.find()
            return res.status(httpCodes.FOUND).json({
                owners : owner,
                properties : property,
                agents : agent,
                customers : customer,
                visits : visit,
                deals : deal
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new mainController