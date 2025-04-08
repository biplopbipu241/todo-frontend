// src/components/TodoForm.js
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://todo-api-7888.onrender.com";

const TodoForm = ({ fetchTodos }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await axios.post(`${API_BASE_URL}/todos`, formData);
      setFormData({ title: '', description: '' });
      await fetchTodos();
    } catch (error) {
      setError('Failed to add todo');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        maxLength={100}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;