import React, { useRef } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

// components
import Modal from "../modal/Modal";
import PasswordInput from "../inputs/specialInputs/PasswordInput";
import EmailInput from "../inputs/specialInputs/EmailInput";

// elements
import RoundPen from "../../Elements/svgs/RoundPen";
import BlueTick from "../../Elements/svgs/BlueTick";
import axios from "axios";
import SvgLogout from "../../Elements/Logout";
import { removeAuthCookie } from "../../services/auth";

function UserPopup({ modalRef }) {
  const usernameRef = useRef();
  const usernameSuccessref = useRef();
  const passwordRef = useRef();
  const passwordSuccess = useRef();

  const router = useNavigate();

  const controller = new AbortController();

  //useEffect(() => {
  //   return controller.abort();
  //  });

  function handleEditUserName() {
    modalRef.current.classList.add("modal__hidden");
    // show next modal
    usernameRef.current.classList.toggle("modal__hidden");
  }
  const handleChangePassword = () => {
    modalRef.current.classList.add("modal__hidden");
    // show next modal
    passwordRef.current.classList.toggle("modal__hidden");
  };

  const handleLogout = () => {
    removeAuthCookie();
    router("/login");
  };

  function Start() {
    return (
      <Modal refer={modalRef} noClose>
        <div
          className="d-flex align-items-center"
          style={{
            gap: "3rem",
          }}
        >
          <p
            className="d-flex align-items-center justify-content-between m-0 text-primary"
            style={{
              cursor: "pointer",
            }}
            onClick={handleEditUserName}
          >
            <RoundPen className="text-success" />
            <span className="ms-2 ps-2 border-start border-2 border-primary">
              Change Email
            </span>
          </p>
          <p
            className="d-flex align-items-center justify-content-between m-0 text-primary"
            style={{
              cursor: "pointer",
            }}
            onClick={handleChangePassword}
          >
            <RoundPen className="text-success" />
            <span className="ms-2 ps-2 border-start border-2 border-primary">
              Change Password
            </span>
          </p>

          <p
            className="d-flex align-items-center justify-content-between m-0 text-primary"
            style={{
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            <SvgLogout className="text-danger" />
            <span className="ms-2 ps-2 border-start border-2 border-primary text-danger">
              Logout
            </span>
          </p>
        </div>
      </Modal>
    );
  }

  function EditUsername({ refer }) {
    const formik = useFormik({
      initialValues: {
        email: "",
      },
      onSubmit: (values) => {
        axios
          .post(
            "api/account/changeemail",
            { ...values },
            { signal: controller.signal }
          )
          .then((response) => {
            if (response.status === 200) {
              refer.current.classList.add("modal__hidden");
              usernameSuccessref.current.classList.remove("modal__hidden");
            } else {
              //show errors
            }
          });
      },
      validate: (values) => {
        let errors = {
          email: [],
        };
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
        if (errors.email.length === 0) {
          errors = null;
        }
      },
    });
    return (
      <Modal refer={refer} noClose>
        <form className="p-2" onSubmit={formik.handleSubmit}>
          <div
            className="d-flex align-items-center justify-content-between p-0 container-fluid"
            style={{
              gap: "2rem",
              marginBottom: "2em",
            }}
          >
            <EmailInput
              name="email"
              {...formik.getFieldProps("email")}
              errors={formik.touched.email && formik.errors.email ? [] : null}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <button className="btn btn-primary px-2" type="submit">
              Update Email
            </button>
          </div>
        </form>
      </Modal>
    );
  }

  function Success({ refer }) {
    return (
      <Modal refer={refer}>
        <div
          className="success d-flex flex-column align-items-center justify-content-center"
          style={{
            minWidth: "28rem",
          }}
        >
          <h5 className="mb-3">Name Successfully Updated</h5>
          <BlueTick />
        </div>
      </Modal>
    );
  }

  function ChangePassword({ refer }) {
    const formik = useFormik({
      initialValues: {
        password: "",
      },
      onSubmit: (values) => {
        // after submission:
        // display success modal

        axios
          .post(
            "api/account/changepassword",
            { ...values },
            { signal: controller.signal }
          )
          .then((response) => {
            if (response.status === 200) {
              refer.current.classList.add("modal__hidden");
              passwordSuccess.current.classList.remove("modal__hidden");
            } else {
              //show errors
            }
          });
      },
      validate: (values) => {
        let errors = {
          password: [],
        };
        // password
        if (!values.password) {
          errors.password = [
            { msg: "Please enter your password", type: "bad" },
          ];
        }
        if (values.password.length < 8) {
          errors.password.push({
            msg: "The password must be at least 8 characters long",
            type: "bad",
          });
        }
        if (!/[!@#$%^&*]+/.test(values.password)) {
          errors.password.push({
            msg: "Please choose a strong password that includes at least 1 lowercase and uppercase letter, a number, as well as a special character (!@#$%^&*)",
            type: "bad",
          });
        } else if (!/[\d]+/.test(values.password)) {
          errors.password.push({
            msg: "Please choose a strong password that includes at least 1 lowercase and uppercase letter, a number, as well as a special character (!@#$%^&*)",
            type: "bad",
          });
        } else if (!/[\w]+/.test(values.password)) {
          errors.password.push({
            msg: "Please choose a strong password that includes at least 1 lowercase and uppercase letter, a number, as well as a special character (!@#$%^&*)",
            type: "bad",
          });
        }

        if (errors.password.length === 0) {
          errors = null;
        }

        return errors;
      },
    });
    return (
      <Modal noClose refer={refer}>
        <form onSubmit={formik.handleSubmit}>
          <div
            className="d-flex flex-column my-4"
            style={{
              gap: "1.4rem",
            }}
          >
            <PasswordInput
              required
              name="password"
              {...formik.getFieldProps("password")}
              errors={
                formik.touched.password && formik.errors.password ? [] : null
              }
            />
          </div>
          <button className="btn-primary btn mt-4 mb-3 ms-auto" type="submit">
            Change Password
          </button>
        </form>
      </Modal>
    );
  }

  return (
    <>
      <Start />
      <EditUsername refer={usernameRef} />

      <Success refer={usernameSuccessref} />

      <ChangePassword refer={passwordRef} />
    </>
  );
}

export default UserPopup;
