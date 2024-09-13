import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';

const CategoryOfBooks = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
    const uniqueCategories = [...new Set(fetchedBooks.map(book => book.category))];
    setCategories(uniqueCategories);
  };

  const filteredBooks = selectedCategory
    ? books.filter(book => book.category === selectedCategory)
    : books;

  return (
    <div>
      <h2>Category of Books</h2>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <ul>
        {filteredBooks.map(book => (
          <li key={book._id}>
            {book.title} by {book.author} - {book.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryOfBooks;