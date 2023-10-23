import React from "react";
import { useState, useEffect } from "react";
import addtodologo from "./images/addtodologo.png";
import "./modal.css";

const TodoForm = ({
  onSubmit,
  formData,
  setFormData,
  onClose,
  initialFormData,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadlineYear: "",
    deadlineMonth: "",
    deadlineDay: "",
    done: false,
  });

  // useEffect to update form data when initialFormData prop changes (for editing)
  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title.trim() === "" || formData.description.trim() === "") {
      alert("Please fill out all fields");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-content">
      <div className="logo-container">
        <img
          style={{ width: "80px", height: "80px" }}
          src={addtodologo}
          alt="addtodologo"
        />
      </div>

      <h2>Add Todo</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </label>
        <label>
          Due Date:
          <div style={{ alignItems: "center" }}>
            <select
              value={formData.deadlineDay}
              onChange={(e) =>
                setFormData({ ...formData, deadlineDay: e.target.value })
              }
            >
              {Array.from({ length: 31 }, (_, index) => index + 1).map(
                (day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                )
              )}
            </select>
            <select
              value={formData.deadlineMonth}
              onChange={(e) =>
                setFormData({ ...formData, deadlineMonth: e.target.value })
              }
            >
              {Array.from({ length: 12 }, (_, index) => index + 1).map(
                (month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                )
              )}
            </select>
            <select
              value={formData.deadlineYear}
              onChange={(e) =>
                setFormData({ ...formData, deadlineYear: e.target.value })
              }
            >
              {Array.from({ length: 6 }, (_, index) => currentYear + index).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
          </div>
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default TodoForm;
