import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

export const addBook = async (book) => {
  const response = await axios.post(`${API_URL}/books`, book);
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await axios.put(`${API_URL}/books/${id}`, book);
  return response.data;
};

export const issueBook = async (bookId) => {
  const response = await axios.post(`${API_URL}/transactions/issue`, { bookId });
  return response.data;
};

export const returnBook = async (bookId) => {
  const response = await axios.post(`${API_URL}/transactions/return`, { bookId });
  return response.data;
};