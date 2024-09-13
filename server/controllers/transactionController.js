const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const User = require('../models/User');
const Membership = require('../models/Membership');

exports.issueBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId).populate('membership');
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(400).json({ message: 'User or Book not found' });
    }

    if (!book.available) {
      return res.status(400).json({ message: 'Book is not available' });
    }

    const activeTransactions = await Transaction.countDocuments({ user: userId, returnDate: null });
    if (activeTransactions >= user.membership.maxBooks) {
      return res.status(400).json({ message: 'Maximum books limit reached' });
    }

    const transaction = new Transaction({
      user: userId,
      book: bookId,
      issueDate: new Date()
    });

    await transaction.save();

    book.available = false;
    await book.save();

    res.status(201).json({ message: 'Book issued successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findById(transactionId).populate('user').populate('book');
    if (!transaction) {
      return res.status(400).json({ message: 'Transaction not found' });
    }

    const returnDate = new Date();
    const daysOverdue = Math.max(0, Math.floor((returnDate - transaction.issueDate) / (1000 * 60 * 60 * 24)) - transaction.user.membership.duration);
    const fine = daysOverdue * transaction.user.membership.fineRate;

    transaction.returnDate = returnDate;
    transaction.fine = fine;
    await transaction.save();

    transaction.book.available = true;
    await transaction.book.save();

    res.json({ message: 'Book returned successfully', fine });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.payFine = async (req, res) => {
  try {
    const { transactionId, amount } = req.body;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(400).json({ message: 'Transaction not found' });
    }

    if (amount < transaction.fine) {
      return res.status(400).json({ message: 'Insufficient payment amount' });
    }

    transaction.fine = 0;
    await transaction.save();

    res.json({ message: 'Fine paid successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};