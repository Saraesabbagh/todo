import React from "react";
import './modal.css';
import addtodologo from "./images/addtodologo.png";

const Modal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
      <div className="modal-content">
        <div className="logo-container"><img style={{ width: '80px', height: '80px' }} src={addtodologo} alt="addtodologo" /></div>
      
        <h2>Add Todo</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
            onClose();
          }}
        >
          <label>
            Title:
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </label>
          <button type="submit">Add</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;