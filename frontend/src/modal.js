import React, { useRef, useEffect } from "react";

import './modal.css';
import addtodologo from "./images/addtodologo.png";

const Modal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.className === "overlay" && isOpen) {
        onClose();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const currentYear = new Date().getFullYear();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title.trim() === '' || formData.description.trim() === '') {
     
      alert('Please fill out all fields');
      return;
    }
    onSubmit(formData);
    onClose();
  };


  return (
    <div className="overlay">
      <div className="modal">
      <div className="modal-content">
        <div className="logo-container"><img style={{ width: '80px', height: '80px' }} src={addtodologo} alt="addtodologo" /></div>
      
        <h2>Add Todo</h2>
        <form
            className="form-container"
          onSubmit={handleSubmit}
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
          <label>
            Due Date:
            <div style={{  alignItems: 'center' }}>
                <select
                    value={formData.deadlineDay}
                    onChange={(e) => setFormData({ ...formData, deadlineDay: e.target.value })}
                >
                    
                    {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                    ))}
                   
                </select>
                <select
                    value={formData.deadlineMonth}
                    onChange={(e) => setFormData({ ...formData, deadlineMonth: e.target.value })}
                >
           
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                    <option key={month} value={month}>
                        {month}
                    </option>
                    ))}
                </select>
                <select
                    value={formData.deadlineYear}
                    onChange={(e) => setFormData({ ...formData, deadlineYear: e.target.value })}
                    >
                    {Array.from({ length: 6 }, (_, index) => currentYear + index).map((year) => (
                        <option key={year} value={year}>
                        {year}
                        </option>
                    ))}
                </select>
            </div>
            </label>
            <button type="submit">Add</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;