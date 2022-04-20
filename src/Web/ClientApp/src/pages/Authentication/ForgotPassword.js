import React, { useState, useEffect } from "react";
import EmailInput from "../../components/inputs/specialInputs/EmailInput";
import AuthenticationLogo from "./AuthenticationLogo";
import { Link } from "react-router-dom";
import AuthenticationLayout from "./AuthenticationLayout";
import axios from "axios";

// form
import { useFormik } from "formik";

const ForgotPassword = () => {
  const controller = new AbortController();

  useEffect(() => {
    return () => {
      controller.abort();
    };
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);

      axios
        .get(`/api/account/resetpassword?email=${values.email}`, {
          signal: controller.signal,
        })
        .then((response) => {
          if (response.status === 200) {
            setInComplete(false);
          } else {
            //handle errors.
          }
        });

      setInComplete(false);
    },
    validate: (values) => {
      let errors = {
        email: [],
      };

      // email
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

      //
      let newEmailErrs = [];
      errors.email.forEach((err) => {
        if (err.type === "bad") {
          newEmailErrs.push(err);
        }
      });

      if (newEmailErrs.length === 0) {
        errors = null;
      }
      return errors;
    },
  });

  const [incomplete, setInComplete] = useState(true);

  return (
    <AuthenticationLayout>
      <section className="content col m-0 p-5 pt-4 container-fluid rounded-start bg-white d-flex flex-column justify-content-between">
        <AuthenticationLogo text="Parish Portal" />
        <div>
          <section className="errors mb-4 error-msg">
            {formik.touched.email && formik.errors.email
              ? formik.errors.email.map((error, index) => {
                  return (
                    <li key={index} className={error.type}>
                      {error.msg}
                    </li>
                  );
                })
              : null}
          </section>
          <div className="mb-4">
            <p className="text-muted small">
              Go back to{" "}
              <Link to="/login" className="text-primary text-decoration-none">
                {" "}
                Login
              </Link>
            </p>
            {incomplete ? (
              <>
                <h4 className="mb-1 fw-bold">Forgot Password?</h4>
                <p className="text-muted small pt-0 mt-0">
                  Don't worry, we will send you a reset link
                </p>
              </>
            ) : (
              <p className="text-muted small pt-0 mt-0">
                We sent a password reset link to {formik.values.email}
              </p>
            )}
          </div>
          {incomplete && (
            <form
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column g-2"
            >
              <EmailInput
                name="email"
                {...formik.getFieldProps("email")}
                errors={formik.touched.email && formik.errors.email ? [] : null}
              />
              <input
                required
                type="submit"
                value="Reset password"
                className="text-uppercase flex-fill text-center fw-bold p-2 my-4 btn btn-sm btn-primary"
              />
            </form>
          )}
        </div>
      </section>
      <section className="content content-img col m-0 p-4 pb-2 container-fluid rounded-end d-flex flex-column justify-content-end">
        <img
          alt="Forgot Password Page"
          src="/images/forgotPassword.png"
          className="content-img__image img-fluid"
        />
      </section>
    </AuthenticationLayout>
  );
};

export default ForgotPassword;
