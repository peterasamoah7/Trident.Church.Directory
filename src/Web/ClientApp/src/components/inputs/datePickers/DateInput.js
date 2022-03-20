import React from "react";

function DateInput(props) {
  return (
    <React.Fragment>
      <div className={`input-container ${props.className}`}>
        <input
          id={props.id || "dateInput"}
          type={props.type}
          className={props.inputClass || "form-control"}
          onChange={props.onChange}
          placeholder={props.placeholder || " "}
          value={props.value}
          onClick={props.onClick}
          autoComplete="off"
        ></input>
        <label htmlFor="dateInput" className="input-label">
          {props.label || "label"}
        </label>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default DateInput;
