import React, { useRef } from "react";

import "../input.css";

import Search from "../../../Elements/svgs/Search";

function SearchInput({
  errors,
  large,
  noIcon,
  label,

  //
  name,
  value,
}) {
  const searchRef = useRef();

  function handleSearch(e) {
    e.preventDefault();

    console.log(searchRef.current.value);
  }

  return (
    <form
      className={`input-container input-container__search ${
        large ? "input-container__lg" : ""
      } ${noIcon ? "icon-0" : ""} ${errors ? "input-error" : ""}`}
      onSubmit={handleSearch}
    >
      <label>
        <Search className="icon-one" />
        <div className="input-group">
          <input
            type={"text"}
            className="input form-control"
            placeholder=" "
            name={name}
            ref={searchRef}
          />
          <span className="input-label">
            {label || "Search by name location or priest"}
          </span>
          <button className="btn btn-secondary" type="submit">
            search
          </button>
        </div>
      </label>
      <section className="error-msg"></section>
    </form>
  );
}

export default SearchInput;

function Input({ ...props }) {
  return (
    <input
      type={"text"}
      className="input form-control"
      placeholder=" "
      //
      {...props}
    />
  );
}
