// src/components/EditTodoModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const EditTodoModal = ({ todo, onClose, fetchTodos }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:10/todos/${todo._id}`, { title, description });
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
        <h2>Edit Todo</h2>
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditTodoModal;