import React, { useRef } from "react";
import { Link } from "react-router-dom";

// components
import Modal from "../../components/modal/Modal";
import SpecialInput from "../../components/inputs/specialInputs/SpecialInput";

// Elements
import EmojiMail from "../../Elements/svgs/EmojiMail";
import Parish from "../../Elements/svgs/Parish";
import BlueTick from "../../Elements/svgs/BlueTick";
import House from "../../Elements/svgs/House";
import GreenChat from "../../Elements/svgs/GreenChat";
import Layout from "../../components/Layout";

function CreateUnit(props) {
  const modalRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    modalRef.current.classList.toggle("modal__hidden");
  }

  return (
    <Layout type={2}>
      <main>
        <header className="d-flex align-items-end justify-content-between">
          <div>
            <h4>Create a New Unit</h4>
            <p className="m-0 text-muted">
              List of registered and approved parishes
            </p>
          </div>
          <Link to="/groups">&lt; Back to Parish Groups</Link>
        </header>

        <form
          class="bg-white shadow-sm border-muted mt-5 rounded-1"
          onSubmit={handleSubmit}
        >
          <p class="text-muted py-3 px-4 border-bottom me-5">
            The information can be edited from your profile page
          </p>

          <div
            class="inputs d-flex flex-column px-4 pb-4"
            style={{
              gap: "2rem",
            }}
          >
            <SpecialInput type="text" containerClass="input-container__lg">
              <Parish className="input-icon" />
              <label className="input-label">Username</label>
            </SpecialInput>

            <SpecialInput
              type="text"
              containerClass="input-container__lg"
              inputClass="form-select"
            >
              <EmojiMail className="input-icon" />
              <label className="input-label">Associated Parish</label>
            </SpecialInput>

            <div className="input-container textArea-container">
              <textarea
                name="description"
                id="description"
                class="form-control"
                cols="30"
                rows="10"
                width="100%"
                placeholder=" "
              ></textarea>
              <label htmlFor="description" className="input-label">
                Unit Description
              </label>
              <House className="input-icon" />
            </div>

            <div class="submits d-flex justify-content-between">
              <button class="btn btn-outline-primary px-5 py-2">Cancel</button>
              <input
                type="submit"
                value="Create"
                class="btn btn-primary px-5 py-2"
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
            <h5>Unit successfully created</h5>
            <BlueTick />
            <p className="m-0">
              Sanctuary Keepers has been successfully created
            </p>
            <button className="btn btn-primary px-4 py-2">Add Member</button>
            <Link to="/groups" className="d-flex align-items-center mt-3">
              <GreenChat />
              <span className="ms-3 ps-3 border-start border-1 border-primary">
                Back to Parish Groups
              </span>
            </Link>
          </div>
        </Modal>
      </main>
    </Layout>
  );
}

export default CreateUnit;
