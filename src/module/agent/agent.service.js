const autoBind = require("auto-bind");
const agentModel = require("../../models/agent.model");
const createHttpError = require("http-errors");

class agentService{
    #model
    constructor(){
        autoBind(this)
        this.#model = agentModel
    }
    async find(){
        const agents = await this.#model.find({},{__v : 0}).then((data)=>{if(data) return data})

        return agents
    }
    async remove(id){
        await this.checkExistById(id)
        await this.#model.deleteMany({_id: id})

    }
    async create(agentDto){
        const agent = await this.#model.findOne({PhoneNumber : agentDto.PhoneNumber})
        const agent_ = await this.#model.findOne({ NationalCode : agentDto.NationalCode})
        if(agent || agent_){
            throw new createHttpError.NotFound("قبلا ایجاد شده")
        }
        await this.#model.create(agentDto)
    }
    async checkExistById(id){
        const agent = await this.#model.findById(id)
        if(!agent) throw new createHttpError.NotFound("مشاور یافت نشد")
        return agent
    }
    async checkExistByMobile(mobile){
        const agent = await this.#model.findOne({PhoneNumber : mobile})
        if(!agent) throw new createHttpError.NotFound("مشاور یافت نشد")
        return agent
    }
}

module.exports = new agentService