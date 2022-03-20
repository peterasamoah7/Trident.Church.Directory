import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

// inputs
import Input from "../../components/inputs/Input";

// components
import Modal from "../../components/modal/Modal";
import Layout from "../../components/Layout";

// Elements
import BlueTick from "../../Elements/svgs/BlueTick";
import GreenFolder from "../../Elements/svgs/GreenFolder";
import axios from "axios";

function InviteMember() {
  const modalRef = useRef();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      axios.post("/api/account/register", { ...values }).then((response) => {
        if (response.status === 200) {
          modalRef.current.classList.remove("modal__hidden");
        } else {
          //show error
        }
      });
    },
    validate: (values) => {
      let errors = {
        firstName: [],
        lastName: [],
        email: [],
      };
      // FIRST NAME
      let tempfirstNameErr = [];

      if (!values.firstName) {
        errors.firstName.push({ msg: "This is a required field", type: "bad" });
      }

      errors.firstName.forEach((err) => {
        if (err.type === "bad") {
          tempfirstNameErr.push(err);
        }
      });
      if (tempfirstNameErr.length === 0) {
        errors.firstName = null;
      }

      // LAST NAME
      let templastNameErr = [];
      if (!values.lastName) {
        errors.lastName.push({ msg: "This is a required field", type: "bad" });
      }
      errors.lastName.forEach((err) => {
        if (err.type === "bad") {
          templastNameErr.push(err);
        }
      });
      if (templastNameErr.length === 0) {
        errors.lastName = null;
      }

      // EMAIL
      let tempEmailErr = [];

      if (!values.email) {
        errors.email = [
          { msg: "Please enter your email address", type: "bad" },
        ];
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = [
          { msg: "Please enter a valid email address", type: "bad" },
        ];
      }

      errors.email.forEach((err) => {
        if (err.type === "bad") {
          tempEmailErr.push(err);
        }
      });
      if (tempEmailErr.length === 0) {
        errors.email = null;
      }

      if (
        errors.email === null &&
        errors.firstName === null &&
        errors.lastName === null
      ) {
        errors = null;
      }
      //
      return errors;
    },
  });

  return (
    <Layout type={2}>
      <section className="invite-member">
        <div className="d-flex align-items-end justify-content-between">
          <div>
            <h4>Create a New Unit</h4>
            <p className="text-muted small m-0">
              List of registered and approved parishes
            </p>
          </div>
          <Link to="/" className="text-decoration-none small">
            &lt; Back to Parish overview
          </Link>
        </div>

        <form
          className="bg-white py-3 mt-4 shadow-sm border-muted border rounded"
          onSubmit={formik.handleSubmit}
        >
          <header className="px-4 pb-3 border-bottom border-muted border-1 me-5 mb-4">
            <p className="text-muted py-2 m-0">
              The information can be edited from your profile page
            </p>
          </header>

          <div
            className="px-4 py-2 d-flex flex-column"
            style={{
              gap: "2rem",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-between"
              style={{
                gap: "3rem",
              }}
            >
              <Input
                type="text"
                label="First Name"
                large
                noIcon
                {...formik.getFieldProps("firstName")}
                errors={
                  formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : null
                }
              />
              <Input
                type="text"
                label="Last Name"
                large
                noIcon
                {...formik.getFieldProps("lastName")}
                errors={
                  formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : null
                }
              />
            </div>

            <Input
              type="email"
              label="Email Address"
              noIcon
              large
              {...formik.getFieldProps("email")}
              errors={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
            <div className="btns d-flex align-items-center justify-content-between">
              <Link to="/">
                <button
                  className="btn btn-outline-primary px-5 rounded-1"
                  type="button"
                >
                  Cancel
                </button>
              </Link>
              <input
                type="submit"
                value="Invite"
                className="btn btn-primary px-5 rounded-1"
              />
            </div>
          </div>
        </form>

        <Modal refer={modalRef}>
          <div className="d-flex align-items-center justify-content-between my-3">
            <h6 className="m-0">User has been successfully invited</h6>
          </div>
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
              gap: "0.8rem",
            }}
          >
            <BlueTick />
            <p className=" text-muted text-center">
              User has been sent an invite email, and <br /> would be onboarded
              soon
            </p>

            <Link to="/" className="d-flex align-items-center ">
              <GreenFolder />
              <span className="ms-3 ps-3 border-primary border-start border-1 ">
                Back to home
              </span>
            </Link>
          </div>
        </Modal>
      </section>
    </Layout>
  );
}

export default InviteMember;
