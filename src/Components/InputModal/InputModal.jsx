import React, { useState } from "react";
import "./InputModal.css";

const InputModal = ({ header, type, onSubmit, setShowModal }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(header, type, value);
    setShowModal(false);
  };
  if (type === "findReplace") {
    type = "Find & Replace";
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Modify {header}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            {type}:
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={
                type === "formula"
                  ? "Enter formula (e.g., 'x*2+10')"
                  : type === "Find & Replace"
                  ? "Enter find-replace"
                  : "Enter value"
              }
            />
          </label>
          <button type="submit">Apply</button>
          <button type="button" onClick={() => setShowModal(false)}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
