import React, { useState } from "react";

import "../input.css";
import "../../../styles/dist/datepicker.min.css";
import "./dateSelect2.css";

import Calendar from "../../../Elements/svgs/Calendar";
import { useEffect } from "react";

const DateInput = React.forwardRef(
  (
    {
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
    },
    ref
  ) => {
    return (
      <React.Fragment>
        <div
          className={`input-container ${large ? "input-container__lg" : ""} ${
            noIcon ? "icon-0" : ""
          }`}
          ref={ref}
        >
          <label>
            {/* {iconOne} */}
            <input
              id={id || "dateInput"}
              type={type}
              className={inputClass || "form-control input"}
              onChange={onChange}
              placeholder={placeholder || " "}
              value={value ?? ""}
              // onClick={onClick}
              // autoComplete="off"
            />
            {/* {iconTwo} */}
            <span className="input-label">{label}</span>
          </label>
          <section className="error-msg"></section>
        </div>
      </React.Fragment>
    );
  }
);

function DateSelect(props) {
  const [date, setDate] = useState(props.date ?? "");

  useEffect(() => {
    setDate(() => props.date);
  }, [props.date]);

  return (
    <DateInput
      id="dateInput"
      iconTwo={<Calendar className="icon-two" />}
      type="date"
      className={props.inputContainerClass}
      large
      label={props.label || "Date of Birth"}
      onChange={(e) => {
        e.persist();
        setDate(() => e.target.value);
        props.setDate(() => e.target.value);
      }}
      value={date}
    ></DateInput>
    // <Datepicker
    //   selected={date && new Date(props.date)}
    //   value={date && new Date(props.date)}
    //   customInput={
    //   }
    //   dateFormat={"dd MMMM yyyy"}
    //   isClearable
    //   placeholderText={props.placeholder || " "}
    // ></Datepicker>
  );
}

export default DateSelect;

// function DateInput({
//   id,
//   type,
//   inputClass,
//   onChange,
//   placeholder,
//   value,
//   onClick,
//   label,
//   large,
//   noIcon,
//   iconOne,
//   iconTwo,
// }) {
//   return (
//     <React.Fragment>
//       <div
//         className={`input-container ${large ? "input-container__lg" : ""} ${
//           noIcon ? "icon-0" : ""
//         }`}
//       >
//         <label>
//           {iconOne}
//           <input
//             id={id || "dateInput"}
//             type={type}
//             className={inputClass || "form-control input"}
//             onChange={onChange}
//             placeholder={placeholder || " "}
//             value={value}
//             onClick={onClick}
//             autoComplete="off"
//           />
//           {iconTwo}
//           <span className="input-label">{label}</span>
//         </label>
//         <section className="error-msg"></section>
//       </div>
//     </React.Fragment>
//   );
// }
