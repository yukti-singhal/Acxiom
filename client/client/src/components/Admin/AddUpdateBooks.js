import React, { useState, useEffect } from 'react';
import { addBook, updateBook, getBooks } from '../../services/api';

const AddUpdateBooks = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({ title: '', author: '', category: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (book._id) {
      await updateBook(book._id, book);
    } else {
      await addBook(book);
    }
    fetchBooks();
    setBook({ title: '', author: '', category: '' });
  };

  return (
    <div>
      <h3>Add/Update Books</h3>
      <form onSubmit={handleSubmit}>
        <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
        <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
        <input name="category" value={book.category} onChange={handleChange} placeholder="Category" required />
        <button type="submit">{book._id ? 'Update' : 'Add'} Book</button>
      </form>
      <ul>
        {books.map(b => (
          <li key={b._id} onClick={() => setBook(b)}>
            {b.title} by {b.author} ({b.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddUpdateBooks;