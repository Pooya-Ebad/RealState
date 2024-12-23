const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
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
    description: {
      type: String,
    },
    visit_date: {
      type: Date,
      required: true,
    },
  }, {timestamps : false});
  
  const visitModel = mongoose.model('Visit', visitSchema);
  module.exports = visitModel;
  