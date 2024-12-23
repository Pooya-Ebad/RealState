const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    NationalCode: {
      type: String,
      required: true,
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
    },
  }, {timestamps : true});
  
  const aAgentModel = mongoose.model('Agent', agentSchema);
  module.exports = aAgentModel;
  