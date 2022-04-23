import React from "react";

function SpecialInput({
  type,
  isTextArea,
  value,
  setValue,
  placeholder,
  name,
  icon,
}) {
  return (
    <React.Fragment>
      <div className="input-group mb">
        <span
          className="input-group-text bg-white"
          id="basic-addon1"
          style={{
            borderRight: "none",
            display: isTextArea ? "block" : "flex",
          }}
        >
          {icon}
        </span>
        {!isTextArea ? (
          <input
            type={type ?? "text"}
            className="form-control pb-2"
            placeholder={placeholder}
            aria-label={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby="basic-addon1"
            style={{ borderLeft: "none" }}
          />
        ) : (
          <textarea
            cols="30"
            rows="10"
            width="100%"
            className="form-control"
            aria-label={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ borderLeft: "none", resize: "none" }}
            placeholder={placeholder}
          ></textarea>
        )}
      </div>
    </React.Fragment>
  );
}

export default SpecialInput;
