import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import ProgressBar from "../../../components/ProgressBar";
import Input from "../../../components/inputs/Input";
import Modal from "../../../components/modal/Modal";

// elements
import GreenPlus from "../../../Elements/svgs/GreenPlus";
import BlueTick from "../../../Elements/svgs/BlueTick";
import GreenChat from "../../../Elements/svgs/GreenChat";
import Layout from "../../../components/Layout";

function AssociatedPriestS3(props) {
  const modalRef = useRef();
  const modalToggle = useRef();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      search3: "",
    },
    onSubmit: (values) => {
      // after submiting;
      modalRef.current.classList.toggle("modal__hidden");
    },
  });

  function handleCreate(e) {
    e.preventDefault();
    modalRef.current.classList.toggle("modal__hidden");
    // 	console.log(modalRef.current);
  }
  return (
    <Layout type={2}>
      <main>
        <header className="d-flex align-items-end justify-content-between">
          <div>
            <h5>Add new parish</h5>
            <p className="text-muted m-0">
              List of registered and approved parishes
            </p>
          </div>
          <Link to="/parish" className="text-decoration-none">
            &lt; Back to Parish Overview
          </Link>
        </header>
        <ProgressBar stage={2} />
        <form
          className="bg-white mt-4 border-gray-500 shadow-sm rounded"
          onSubmit={formik.handleSubmit}
        >
          <div className="border-bottom border-muted p-4 d-flex align-items-center justify-content-between">
            <p className="text-muted m-0">Add new members into the parish</p>
            <Link to="" onClick={handleCreate} className="text-decoration-none">
              Skip this step
            </Link>
          </div>
          <div
            className="d-flex flex-column px-4 py-4"
            style={{
              gap: "2rem",
            }}
          >
            <Input
              large
              label="Ebenezer Presbyterian"
              noIcon
              {...formik.getFieldProps("search3")}
              name="search3"
            />
            <Link to="" className="d-flex align-items-center">
              <GreenPlus />
              <span className="border-start border-primary border-1 ms-2 ps-2">
                Create a new priest
              </span>
            </Link>
            <div className="d-flex align-items-center justify-content-between mt-3">
              <button className="btn btn-outline-primary px-5" type="button">
                Back
              </button>
              <button
                className="btn btn-primary px-5"
                ref={modalToggle}
                type="submit"
              >
                Create
              </button>
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
            <h5>Parish successfully create</h5>
            <BlueTick />
            <p className="m-0">
              His joyful Parish has been successfully created
            </p>
            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => {
                navigate("/parish/view-parish/");
              }}
            >
              View Parish
            </button>
            <Link to="/parish" className="d-flex align-items-center mt-3">
              <GreenChat />
              <span className="ms-3 ps-3 border-start border-1 border-primary">
                Back to parish Overview
              </span>
            </Link>
          </div>
        </Modal>
      </main>
    </Layout>
  );
}

export default AssociatedPriestS3;
