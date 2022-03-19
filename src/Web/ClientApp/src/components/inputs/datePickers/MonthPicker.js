import React, { useState } from "react";
import Datepicker from "react-datepicker";
import DateInput from "./DateInput";

import "../../../styles/dist/datepicker.min.css";

import "./datePicker.css";

function MonthPicker(props) {
  const [date, setDate] = useState(new Date("October 2022"));
  return (
    <Datepicker
      selected={date}
      onChange={(newDate) => {
        setDate(newDate);
      }}
      customInput={
        <DateInput
          inputClass="form-select"
          id="dateinput"
          label="Date"
        ></DateInput>
      }
      showMonthYearPicker
      dateFormat={"MMMM  yyyy"}
      placeholderText=" "
    />
  );
}

export default MonthPicker;
