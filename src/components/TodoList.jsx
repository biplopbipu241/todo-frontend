// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const API_URL = import.meta.env.VITE_API_URL;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch todos');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedTodos(prev => 
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handleBulkAction = async (action) => {
    try {
      setLoading(true);
      const promises = selectedTodos.map(id => {
        const todo = todos.find(t => t._id === id);
        if (action === 'delete') {
          return axios.delete(`${API_URL}/todos/${id}`);
        } else if (action === 'complete') {
          // Include all required fields when updating
          return axios.put(`${API_URL}/todos/${id}`, {
            title: todo.title,
            description: todo.description,
            completed: true
          });
        }
      });
      
      await Promise.all(promises);
      await fetchTodos();
      setSelectedTodos([]);
      setError(null);
    } catch (error) {
      setError(`Failed to ${action} todos`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="todo-list">
      <TodoForm fetchTodos={fetchTodos} />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="controls">
            <button 
              onClick={() => handleBulkAction('delete')} 
              disabled={!selectedTodos.length || loading}
            >
              Delete Selected
            </button>
            <button 
              onClick={() => handleBulkAction('complete')} 
              disabled={!selectedTodos.length || loading}
            >
              Complete Selected
            </button>
          </div>
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              handleCheckboxChange={handleCheckboxChange}
              selectedTodos={selectedTodos}
              fetchTodos={fetchTodos}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TodoList;