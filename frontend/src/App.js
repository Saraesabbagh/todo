import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); // State variable to store todos

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch('http://localhost:8000/todos'); // Updated endpoint
        const data = await res.json();
        setTodos(data); // Update state with fetched todos
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    getTodos(); // Fetch todos when component mounts
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <h1>Welcome to the frontend Todo App</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.title} - {todo.description} {/* Display todo properties */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;