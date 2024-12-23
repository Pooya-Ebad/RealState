const autoBind = require("auto-bind");
const ownerModel = require("../../models/owner.model");
const createHttpError = require("http-errors");

class ownerService{
    #model
    constructor(){
        autoBind(this)
        this.#model = ownerModel
    }
    async find(){
        const owners = await this.#model.find({},{__v : 0}).then((data)=>{if(data) return data})

        return owners
    }
    async remove(id){
        await this.checkExistById(id)
        await this.#model.deleteMany({_id: id})

    }
    async create(ownerDto){
        const owner = await this.#model.findOne({PhoneNumber : ownerDto.PhoneNumber})
        const owner_ = await this.#model.findOne({ NationalCode : ownerDto.NationalCode})
                if(owner || owner_){
                    throw new createHttpError.NotFound("قبلا ایجاد شده")
                }
        await this.#model.create(ownerDto)
    }
    async checkExistById(id){
        const owner = await this.#model.findById(id)
        if(!owner) throw new createHttpError.NotFound("پیدا نشد")
        return owner
    }
    async checkExistByMobile(mobile){
        const owner = await this.#model.findOne({PhoneNumber : mobile})
        if(!owner) throw new createHttpError.NotFound("پیدا نشد")
        return owner
    }
}

module.exports = new ownerService