const mongoose = require('mongoose');

const propertiesSchema = new mongoose.Schema({
  Type: {
    type: String,
    enum: ['مسکونی', 'تجاری'],
    required: true,
  },
  Status: {
    type: String,
    enum: ['اجاره سالانه', 'اجاره روزانه', 'فروش'],
    required: true,
  },
  PostalCode: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  YearOf: {
    type: Number,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  isSold : {
    type: Boolean,
    required: true,
    default : false
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Owner',
    default: null,
  },
},{timestamps : true});

const propertiesModel = mongoose.model('Properties', propertiesSchema);
module.exports = propertiesModel;
