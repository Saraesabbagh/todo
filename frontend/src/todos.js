import React, { useState, useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import "./todos.css";
import Modal from "./modal";
import listiclelogoandname from "./images/listiclelogoandname.png";
// import listiclename from "./images/listiclename.png";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch("http://localhost:8000/todos");
        const data = await res.json();
        const reversedTodos = data.reverse();
        setTodos(reversedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    getTodos();
  }, []);

  const handleDeleteClick = async (entryId) => {
    try {
      const response = await fetch("http://localhost:8000/deletetodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entryId: entryId }),
      });

      if (response.ok) {
        const updatedTodos = todos.filter((todo) => todo._id !== entryId);
        setTodos(updatedTodos);
      } else {
        throw new Error("Failed to delete entry");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setEditTodo(todo);
    setIsModalOpen(true);
  };

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const response = await fetch(
        `http://localhost:8000/updatetodo/${updatedTodo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodo),
        }
      );

      if (response.ok) {
        const updatedTodos = todos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        );
        setTodos(updatedTodos);
        setIsModalOpen(false);
        setIsEditing(false);
        setEditTodo(null);
      } else {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <div className="logoContainer">
        <img src={listiclelogoandname} alt="ListicleLogo and name" />
      </div>
      <div className="container">
        <div className="titleButtonContainer">
          <span className="inline-container">
            <h2>My Todos</h2>
            <button className="addButton" onClick={() => setIsModalOpen(true)}>
              Add Todo
            </button>
          </span>
        </div>

        <ol>
          {todos.map((todo) => (
            <li key={todo._id}>
              {todo.title} - {todo.description} -{" "}
              <input
                type="checkbox"
                checked={todo.done} // Set checkbox state based on the todo's done property
                // onChange={() => handleCheckboxChange(todo._id, !todo.done)}
              />
              <button>
                <MdDelete
                  entryId={todo._id}
                  onClick={() => handleDeleteClick(todo._id)}
                />
              </button>
              <button>
                <MdModeEdit
                  entryId={todo._id}
                  onClick={() => handleDeleteClick(todo._id)}
                />
              </button>
            </li>
          ))}
        </ol>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TodoForm
          onSubmit={isEditing ? handleUpdateTodo : handleAddTodo}
          initialFormData={isEditing ? editTodo : null}
        />
      </Modal>
    </div>
  );
}

export default Todos;
