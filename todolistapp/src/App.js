// src/App.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const TodoList = ({ todos, onToggle, onDelete }) => (
  <ul className="todo-list">
    {todos.map((todo, index) => (
      <li key={index} className="todo-item">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input todo-checkbox"
            checked={todo.completed}
            onChange={() => onToggle(index)}
          />
          <label
            className={`form-check-label ${todo.completed ? 'completed' : ''}`}
          >
            {todo.text}
          </label>
        </div>
        <button
          className="btn btn-danger btn-sm ml-2"
          onClick={() => onDelete(index)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

const TodoForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
  };

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <TodoForm onSubmit={addTodo} />
    </div>
  );
}

export default App;
