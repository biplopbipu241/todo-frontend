// src/components/TodoItem.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoModal from './TodoModal';

const TodoItem = ({ todo, handleCheckboxChange, selectedTodos, fetchTodos }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`todo-item ${selectedTodos.includes(todo._id) ? 'selected' : ''}`}>
      <input
        type="checkbox"
        checked={selectedTodos.includes(todo._id)}
        onChange={() => handleCheckboxChange(todo._id)}
      />
      <span
        className={`todo-title ${todo.completed ? 'completed' : ''}`}
        onClick={() => setShowModal(true)}
      >
        {todo.title}
      </span>
      {showModal && (
        <TodoModal 
          todo={todo} 
          onClose={() => setShowModal(false)} 
          fetchTodos={fetchTodos} 
        />
      )}
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string.required,
    title: PropTypes.string.required,
    description: PropTypes.string.required,
    completed: PropTypes.bool
  }).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  selectedTodos: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchTodos: PropTypes.func.isRequired
};

export default TodoItem;