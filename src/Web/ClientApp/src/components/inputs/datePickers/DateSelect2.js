import React, { useState } from "react";
import Datepicker from "react-datepicker";

import "../input.css";
import "../../../styles/dist/datepicker.min.css";
import "./dateSelect2.css";

import Calendar from "../../../Elements/svgs/Calendar";
import { useEffect } from "react";

function DateSelect(props) {
  const [date, setDate] = useState(props.date ?? null);

  useEffect(() => {
    setDate(() => props.date);
  }, [props.date]);

  return (
    <Datepicker
      selected={date && new Date(props.date)}
      value={date && new Date(props.date)}
      onChange={(newDate) => {
        setDate(newDate);
        props.setDate(newDate);
      }}
      customInput={
        <DateInput
          id="dateInput"
          iconTwo={<Calendar className="icon-two" />}
          type="text"
          className={props.inputContainerClass}
          large
          label={props.label || "Date of Birth"}
        ></DateInput>
      }
      dateFormat={"dd MMMM yyyy"}
      isClearable
      placeholderText={props.placeholder || " "}
    ></Datepicker>
  );
}

export default DateSelect;

function DateInput({
  id,
  type,
  inputClass,
  onChange,
  placeholder,
  value,
  onClick,
  label,
  large,
  noIcon,
  iconOne,
  iconTwo,
}) {
  return (
    <React.Fragment>
      <div
        className={`input-container ${large ? "input-container__lg" : ""} ${
          noIcon ? "icon-0" : ""
        }`}
      >
        <label>
          {iconOne}
          <input
            id={id || "dateInput"}
            type={type}
            className={inputClass || "form-control input"}
            onChange={onChange}
            placeholder={placeholder || " "}
            value={value}
            onClick={onClick}
            autoComplete="off"
          />
          {iconTwo}
          <span className="input-label">{label}</span>
        </label>
        <section className="error-msg"></section>
      </div>
    </React.Fragment>
  );
}
