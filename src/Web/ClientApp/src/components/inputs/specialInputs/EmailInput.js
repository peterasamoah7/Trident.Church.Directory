import React from "react";

import "../input.css";

import Mail from "../../../Elements/svgs/Mail";

function EmailInput({
  errors,
  large,
  label,
  noIcon,
  required,
  //
  name,
  value,
  onBlur,
  onChange,
}) {
  return (
    <div
      className={`input-container ${large ? "input-container__lg" : ""} ${
        noIcon ? "icon-0" : ""
      } ${errors ? "input-error" : ""}`}
    >
      <label>
        <Mail className="icon-one" />
        {required ? (
          <input
            required
            type="email"
            className="input form-control"
            placeholder=" "
            //
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
          />
        ) : (
          <input
            type="email"
            className="input form-control"
            placeholder=" "
            //
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
        <span className="input-label">{label || "Email Address"}</span>
      </label>
      <section className="error-msg">
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
      </section>
    </div>
  );
}

export default EmailInput;
