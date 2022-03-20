import React, { useState } from "react";
import AuthenticationLogo from "./AuthenticationLogo";
import PasswordInput from "../../components/inputs/specialInputs/PasswordInput";
import { Link } from "react-router-dom";
import AuthenticationLayout from "./AuthenticationLayout";
import axios from "axios";
import { useParams } from "react-router-dom";

// formik
import { useFormik } from "formik";

const ResetPassword = () => {
  let params = useParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      userId: params.id,
    },
    onSubmit: (values) => {
      axios
        .post(`/api/account/resetpassword`, { ...values })
        .then((response) => {
          if (response.status === 200) {
            setInComplete(false);
          } else {
            //handle errors.
          }
        });
    },
    validate: (values) => {
      let errors = {
        password: [],
      };

      // password
      if (!values.password) {
        errors.password = [{ msg: "Please enter your password", type: "bad" }];
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

      let newPassworderrs = [];
      errors.password.forEach((err) => {
        if (err.type === "bad") {
          newPassworderrs.push(err);
        }
      });

      if (newPassworderrs.length === 0) {
        errors = null;
      }
      return errors;
    },
  });

  const [inComplete, setInComplete] = useState(true);

  return (
    <AuthenticationLayout>
      <section className="content col m-0 p-5 pt-4 container-fluid rounded-start bg-white d-flex flex-column justify-content-between">
        <AuthenticationLogo text="Parish Portal" />
        <div>
          <section className="errors mb-4 error-msg">
            {formik.errors.password && formik.touched.password
              ? formik.errors.password.map((error, index) => {
                  return (
                    <li key={index} className={error.type}>
                      {error.msg}
                    </li>
                  );
                })
              : null}
          </section>
          <p className="text-muted small">
            Go back to{" "}
            <Link to="/login" className="text-primary text-decoration-none">
              {" "}
              Login
            </Link>
          </p>
          {inComplete ? (
            <>
              <div className="mb-3">
                <h4 className="mb-1 fw-bold">Set new password</h4>
                <p className="text-muted small pt-0 mt-0">
                  Choose a password different from your previous password
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex flex-column mb-4">
                <header>
                  <h3 className="fw-bold mb-1">Password reset</h3>
                  <p className="small text-muted">
                    Your password has been successfully reset. <br />
                    Click continue to login automatically
                  </p>
                </header>
              </div>
            </>
          )}
          {inComplete && (
            <form onSubmit={formik.handleSubmit} className="d-flex flex-column">
              <PasswordInput
                name="password"
                {...formik.getFieldProps("password")}
                errors={
                  formik.touched.password && formik.errors.password ? [] : null
                }
              />
              <p className="small text-muted my-1 p-0">
                Must be at least 8 characters long
              </p>
              <input
                required
                type="submit"
                value="Reset Password"
                className="btn btn-primary small p-2 rounded flex-fill fw-bold mt-2"
              />
            </form>
          )}
        </div>
      </section>
      <section className="content content-img col m-0 p-4 pb-2 container-fluid rounded-end d-flex flex-column justify-content-end">
        <img
          alt="Reset Password Page"
          src="/images/newPassword.png"
          className="content-img__image img-fluid"
        />
      </section>
    </AuthenticationLayout>
  );
};

export default ResetPassword;
