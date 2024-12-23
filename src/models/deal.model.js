const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    custId: {
      type: mongoose.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    agentId: {
      type: mongoose.Types.ObjectId,
      ref: 'Agent',
      required: true,
    },
    propId: {
      type: mongoose.Types.ObjectId,
      ref: 'Properties',
      required: true,
    },
    finalPrice: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    deal_date: {
      type: Date,
    },
  }, {timestamps : false});
  
  const dealModel = mongoose.model('Deal', dealSchema);
  module.exports = dealModel;
  