const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    NationalCode: {
      type: String,
      required: true,
      unique: true,
    },
    FullName: {
      type: String,
      required: true,
      length: 50,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
      length: 150,
    }
  }, {timestamps : true});
  
  const customerModel = mongoose.model('Customer', customerSchema);
  module.exports = customerModel;
  