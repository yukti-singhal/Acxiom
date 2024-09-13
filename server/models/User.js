const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  membership: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership' }
});

module.exports = mongoose.model('User', UserSchema);