import React from "react";
import "../input.css";
import Person from "../../../Elements/svgs/Person";

function NameInput({
  errors,
  label,
  large,
  noIcon,
  required,
  //
  value,
  onChange,
  onBlur,
  name,
}) {
  return (
    <div
      className={`input-container ${large ? "input-container__lg" : ""} ${
        noIcon ? "icon-0" : ""
      } ${errors ? "input-error" : ""}`}
    >
      <label>
        <Person className="icon-one" />
        {required ? (
          <input
            type={"text"}
            className="input form-control"
            placeholder=" "
            autoComplete="off"
            //
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
          />
        ) : (
          <input
            type={"text"}
            className="input form-control"
            placeholder=" "
            autoComplete="off"
            //
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
        <span className="input-label">{label}</span>
      </label>
      <section className="error-msg">
        {
          <ul>
            {errors
              ? errors.map((error, index) => {
                  return (
                    <li key={index} className={error.type}>
                      {error.msg}
                    </li>
                  );
                })
              : null}
          </ul>
        }
      </section>
    </div>
  );
}

export default NameInput;
