const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  fine: { type: Number, default: 0 }
});

module.exports = mongoose.model('Transaction', TransactionSchema);