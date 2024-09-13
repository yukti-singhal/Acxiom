import React, { useState } from 'react';
import { addBook, updateBook } from '../../services/api';

const MaintenanceMenu = () => {
  const [book, setBook] = useState({ title: '', author: '', category: '' });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook(book);
    setBook({ title: '', author: '', category: '' });
  };

  return (
    <div>
      <h2>Maintenance Menu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Book Title"
          required
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          type="text"
          name="category"
          value={book.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default MaintenanceMenu;