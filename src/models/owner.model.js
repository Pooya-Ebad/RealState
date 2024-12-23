const { Schema, model } = require("mongoose");

const OwnerSchema = new Schema({
    NationalCode: {
        type: String,
        required: true,
        unique: true,
      },
      FullName: {
        type: String,
        required: true,
      },
      PhoneNumber: {
        type: String,
        required: true,
      },
      Address: {
        type: String,
        required: true,
      }
}, {timestamps : true})
const ownerModel = model("Owner", OwnerSchema)

module.exports = ownerModel