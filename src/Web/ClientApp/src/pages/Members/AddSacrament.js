import React, { useRef } from "react";
import { Link } from "react-router-dom";

import Modal from "../../components/modal/Modal";
import DateSelect2 from "../../components/inputs/datePickers/DateSelect2";

// elements
import BlueTick from "../../Elements/svgs/BlueTick";
import GreenChat from "../../Elements/svgs/GreenChat";

function AddSacrament({ onLayoutType }) {
  const modalRef = useRef();

  function handleCreate(e) {
    e.preventDefault();
    modalRef.current.classList.toggle("modal__hidden");
  }

  return (
    <main>
      <header className="d-flex align-items-center justify-content-between">
        <div>
          <h5>Add Sacrament</h5>
          <p className="m-0 text-muted">
            List of registered and approved sacraments
          </p>
        </div>
        <Link to="" className="text-decoration-none">
          &lt; Back to parish overview
        </Link>
      </header>

      <form className="mt-5 rounded shadow-sm border border-muted bg-white">
        <p className="border-bottom border-muted px-4 py-4 text-muted">
          The information can be edited from your profile page
        </p>
        <div className="px-4 py-4 pt-2">
          <select
            name="sacrament-type"
            id="sacrament-type"
            className="form-select "
            style={{
              borderColor: "var(--bs-border2)",
              paddingBlock: "0.8rem",
            }}
          >
            <option value="">Sacrament Type</option>
          </select>

          <div
            className="my-4 "
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2rem",
            }}
          >
            <select
              name="parish"
              id="parish"
              className="form-select"
              style={{
                borderColor: "var(--bs-border2)",
                paddingBlock: "0.8rem",
              }}
            >
              <option value="">Parish</option>
            </select>
            <DateSelect2
              placeholder="Place of Birth"
              inputContainerClass="input-container__lg"
            />
          </div>

          <div className="mt-4 d-flex align-items-center justify-content-between">
            <button className="px-5 rounded-1 btn btn-outline-primary">
              Back
            </button>
            <input
              type="submit"
              value="Add Sacrament"
              className="btn btn-primary rounded-1"
              onClick={handleCreate}
            />
          </div>
        </div>
      </form>

      <Modal refer={modalRef}>
        <div
          style={{
            gap: "1rem",
          }}
          className="py-3 text-center d-flex flex-column justify-content-center align-items-center"
        >
          <h5>Sacrament Successfully Added</h5>
          <BlueTick />
          <p className="m-0 text-muted">
            A new sacrament has successfully been added to Peter's profile
          </p>
          <Link to="" className="d-flex align-items-center mt-3">
            <GreenChat />
            <span className="ms-3 ps-3 border-start border-1 border-primary">
              Back to Peter's Profile
            </span>
          </Link>
        </div>
      </Modal>
    </main>
  );
}

export default AddSacrament;
