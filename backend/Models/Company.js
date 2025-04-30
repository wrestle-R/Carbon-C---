const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  registrationToken: {
    type: String,
    required: true,
  },
  carbonCredits: {
    type: Number,
    default: 0
  },
  emissionsData: {
    total: { type: Number, default: 0 },
    target: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Company', companySchema);