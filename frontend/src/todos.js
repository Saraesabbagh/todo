import React, { useState, useEffect } from 'react';
import './todos.css';
import listiclelogoandname from "./images/listiclelogoandname.png";
// import listiclename from "./images/listiclename.png";

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
//   const handleCheckboxChange = async (todoId, done) => {
//     try {
//       // Update the todo's done property in the backend
//       // Implement your logic to update the todo's done property here
//       console.log(`Todo ID: ${todoId}, Done: ${done}`);
//     } catch (error) {
//       console.error('Error updating todo:', error);
//     }
//   };

  return (
    <div>
    <div className='logoContainer'>
      <img src={listiclelogoandname} alt="ListicleLogo and name" />
      </div>
    <div className='container'>
        <div className='titleButtonContainer'>
            <span className="inline-container"><h2 >My Todos</h2><button className='addButton'>Add Todo</button></span>
        </div>
      
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.title} - {todo.description} - <input
                type="checkbox"
                checked={todo.done} // Set checkbox state based on the todo's done property
                // onChange={() => handleCheckboxChange(todo._id, !todo.done)}
              />
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Todos;