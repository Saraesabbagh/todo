import React, { useState, useEffect } from 'react';
import './todos.css';
import Modal from "./modal";
import listiclelogoandname from "./images/listiclelogoandname.png";
// import listiclename from "./images/listiclename.png";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleAddTodo = (todoData) => {
    fetch(`http://localhost:8000/addtodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        console.log("Todo added successfully:", newTodo);
        setTodos([...todos, newTodo]);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };


  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch('http://localhost:8000/todos');
        const data = await res.json();
        const reversedTodos = data.reverse();
        setTodos(reversedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    getTodos();
  }, []);

  return (
    <div>
    <div className='logoContainer'>
      <img src={listiclelogoandname} alt="ListicleLogo and name" />
      </div>
    <div className='container'>
        <div className='titleButtonContainer'>
            <span className="inline-container"><h2 >My Todos</h2><button className='addButton' onClick={() => setIsModalOpen(true)}>
              Add Todo
            </button></span>
        </div>
      
      <ol>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.title} - {todo.description} - <input
                type="checkbox"
                checked={todo.done} // Set checkbox state based on the todo's done property
                // onChange={() => handleCheckboxChange(todo._id, !todo.done)}
              />
          </li>
        ))}
      </ol>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTodo}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}

export default Todos;