import React, { useState, useEffect } from 'react';
import './todos.css';

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch('http://localhost:8000/todos');
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    getTodos();
  }, []);

  return (
    <div>
      <h1>Welcome to the frontend Todo App</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.title} - {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;