import React from "react";

const LabelInput = ({ label, type, name, options = [], value, onChange }) => {
  return (
    <div className="labelcontainer">
      <label>{label}</label>
      {type !== "Text" ? (
        <div className="radio-group">
          {options.map((option, index) => (
            <div key={index} className="radio-option">
              <input
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={onChange}
                className="radio-input"
              />
              <span className="radio-label">{option}</span>
            </div>
          ))}
        </div>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default LabelInput;
