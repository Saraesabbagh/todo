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
    fetch("http://localhost:8000/addtodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        // Assuming the response from the server contains the newly created todo object
        console.log("Todo added successfully:", newTodo);
        // Update your state with the new todo, assuming todos is your state variable containing existing todos
        setTodos([...todos, newTodo]);
        // Close the modal
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        // Handle error scenarios, e.g., show an error message to the user
      });
  };


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
            <span className="inline-container"><h2 >My Todos</h2><button className='addButton' onClick={() => setIsModalOpen(true)}>
              Add Todo
            </button></span>
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