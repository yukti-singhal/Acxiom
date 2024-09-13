import React, { useState, useEffect } from 'react';
import { getBooks, issueBook, returnBook, payFine } from '../../services/api';

const Transactions = () => {
  const [books, setBooks] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchUserTransactions();
  }, []);

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
  };

  const fetchUserTransactions = async () => {
    // Implement this API call
    const fetchedTransactions = await getUserTransactions();
    setUserTransactions(fetchedTransactions);
  };

  const handleIssueBook = async (bookId) => {
    await issueBook(bookId);
    fetchBooks();
    fetchUserTransactions();
  };

  const handleReturnBook = async (transactionId) => {
    const result = await returnBook(transactionId);
    if (result.fine > 0) {
      alert(`Book returned. Fine due: $${result.fine}`);
    }
    fetchBooks();
    fetchUserTransactions();
  };

  const handlePayFine = async (transactionId, fine) => {
    await payFine(transactionId, fine);
    fetchUserTransactions();
  };

  return (
    <div>
      <h2>Transactions</h2>
      <div>
        <h3>Available Books</h3>
        <ul>
          {books.filter(book => book.available).map(book => (
            <li key={book._id}>
              {book.title} by {book.author}
              <button onClick={() => handleIssueBook(book._id)}>Issue</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Your Books</h3>
        <ul>
          {userTransactions.map(transaction => (
            <li key={transaction._id}>
              {transaction.book.title} by {transaction.book.author}
              <button onClick={() => handleReturnBook(transaction._id)}>Return</button>
              {transaction.fine > 0 && (
                <button onClick={() => handlePayFine(transaction._id, transaction.fine)}>
                  Pay Fine (${transaction.fine})
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;