import React from "react";

const LabelInput = ({
  id,
  label,
  type,
  name,
  options = [],
  value,
  handleChange,
  answer
}) => {
  return (
    <div className="labelcontainer">
      <label>{label}</label>
      {type !== "Text" ? (
        <div className="radio-group">
          {options.map((option,index) => (
            <div key={index} className="radio-option">
              <input
                type="radio"
                name={id}
                value={option}
                checked={answer === option}
                onChange={(e) => handleChange(id, e.target.value)}
                className="radio-input"
              />
              <span className="radio-label">{option}</span>
            </div>
          ))}
        </div>
      ) : (
        <input
          type="text"
          name={id}
          value={answer}
          onChange={(e) => handleChange(id, e.target.value)}
          className="text-input"
        />
      )}
    </div>
  );
};

export default LabelInput;
