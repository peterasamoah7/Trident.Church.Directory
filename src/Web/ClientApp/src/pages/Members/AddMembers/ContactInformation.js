import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import Modal from "../../../components/modal/Modal";
import ProgressBar from "../../../components/ProgressBar";
import Input from "../../../components/inputs/Input";

// elements
import BlueTick from "../../../Elements/svgs/BlueTick";
import GreenChat from "../../../Elements/svgs/GreenChat";
import Layout from "../../../components/Layout";

function ContactInformation({ onLayoutType }) {
  const navigate = useNavigate();
  const modalRef = useRef();

  function handleCreate(e) {
    e.preventDefault();
    modalRef.current.classList.toggle("modal__hidden");
  }

  function handleBack(e) {
    e.preventDefault();

    navigate(-1);
  }

  return (
    <Layout type={2}>
      <ProgressBar stage2="Contact Information" stage={2} />
      <form class="bg-white shadow-sm border-light rounded rounded-3 border py-3 pb-4 mt-4 d-flex flex-column">
        <header class="d-flex justify-content-between align-items-center px-4 py-2 pb-4 border-bottom">
          <p class="text-muted p-0 m-0">
            The information can be edited from yuor profile page
          </p>
        </header>

        <div
          className="p-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
          }}
        >
          <Input large noIcon label="Parish" inputClass="form-select" />
          <Input large noIcon label="User Type" inputClass="form-select" />
          <Input large noIcon label="Occupation" inputClass="form-select" />
          <Input large noIcon label="Postal Code" />
          <div
            style={{
              gridColumn: "1/-1",
            }}
          >
            <Input large noIcon label="Home Address" />
          </div>
        </div>

        <div className="mt-4 px-4 d-flex align-items-center justify-content-between">
          <button className="btn btn-outline-primary px-5" onClick={handleBack}>
            Back
          </button>
          <button className="btn btn-primary" onClick={handleCreate}>
            Add new member
          </button>
        </div>
      </form>
      <Modal refer={modalRef}>
        <div
          style={{
            gap: "1rem",
          }}
          className="py-3 text-center d-flex flex-column justify-content-center align-items-center"
        >
          <h5>Member successfully added</h5>
          <BlueTick />
          <p className="m-0 text-muted">
            Peter Asamoah has been successfully added
          </p>
          <button
            className="btn btn-primary px-4 py-2"
            type="button"
            onClick={() => {
              navigate("/members/view-member");
            }}
          >
            View Member
          </button>
          <Link to="/members" className="d-flex align-items-center mt-3">
            <GreenChat />
            <span className="ms-3 ps-3 border-start border-1 border-primary">
              Back to Members Overview
            </span>
          </Link>
        </div>
      </Modal>
    </Layout>
  );
}

export default ContactInformation;
