import React, { useRef, useState } from "react";

import "../input.css";

import Search from "../../../Elements/svgs/Search";

function SearchInput({ errors, large, noIcon, label, name, handleSearch }) {
  const searchRef = useRef();

  const [searchValue, setSearchValue] = useState("");

  async function handleSearchEvent(e) {
    e.preventDefault();
    if (handleSearch instanceof Function) await handleSearch(searchValue);
  }

  return (
    <form
      className={`input-container input-container__search ${
        large ? "input-container__lg" : ""
      } ${noIcon ? "icon-0" : ""} ${errors ? "input-error" : ""}`}
      onSubmit={handleSearchEvent}
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <span className="input-label">{label || "Search"}</span>
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
