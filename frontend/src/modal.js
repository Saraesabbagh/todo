import React, { useRef, useEffect, useState } from "react";
import TodoForm from "./todoform";

import "./modal.css";
// import addtodologo from "./images/addtodologo.png";

const Modal = ({ isOpen, onClose }) => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const handleClickOutside = (event) => {
      if (event.target.className === "overlay" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <TodoForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTodo}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default Modal;
