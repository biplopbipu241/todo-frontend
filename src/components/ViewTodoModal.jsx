// src/components/ViewTodoModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewTodoModal = ({ todo, onClose, fetchTodos }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
  }, [todo]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://todo-api-7888.onrender.com/todos/${todo._id}`, { title, description, completed });
      onClose();
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Error updating todo: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>View/Edit Todo</h2>
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              Completed
            </label>
          </div>
          <button type="submit">Save</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ViewTodoModal;