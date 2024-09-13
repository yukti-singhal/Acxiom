const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  type: { type: String, required: true },
  maxBooks: { type: Number, required: true },
  duration: { type: Number, required: true }, // in days
  fineRate: { type: Number, required: true } // per day
});

module.exports = mongoose.model('Membership', MembershipSchema);