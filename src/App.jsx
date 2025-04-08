// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <div className="app">
      <Header />
      <TodoList />
    </div>
  );
};

export default App;