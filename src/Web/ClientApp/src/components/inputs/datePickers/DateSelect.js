import React, { useState } from "react";
import Datepicker from "react-datepicker";
import DateInput from "./DateInput";

import "../../../styles/dist/datepicker.min.css";

import "./datePicker.css";
import "./dateSelect.css";

function DateSelect(props) {
  const [date, setDate] = useState(null);
  return (
    <Datepicker
      selected={date}
      onChange={(newDate) => {
        setDate(newDate);
      }}
      customInput={
        <DateInput
          inputClass={`form-select date-select ${props.inputClass}`}
          id="dateSelect"
          label={props.label || "Date"}
        ></DateInput>
      }
      dateFormat={"dd/MM/yyyy"}
      isClearable
      placeholderText={props.placeholder || " "}
    />
  );
}

export default DateSelect;
