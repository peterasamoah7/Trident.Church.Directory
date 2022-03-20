import React from "react";
import CheckboxInput from "../../components/inputs/specialInputs/CheckboxInput";
import EmailInput from "../../components/inputs/specialInputs/EmailInput";
import PasswordInput from "../../components/inputs/specialInputs/PasswordInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthenticationLogo from "./AuthenticationLogo";
import AuthenticationLayout from "./AuthenticationLayout";
import { setAuthCookie } from "../../services/auth";

// Formik
import { useFormik } from "formik";

const Login = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberUser: false,
    },
    onSubmit: (values) => {
      axios.post(`/api/account/login`, { ...values }).then((response) => {
        if (response.status === 200) {
          setAuthCookie();
          navigate(from, { replace: true });
        } else {
          //handle errors.
        }
      });
    },
    validate: (values) => {
      let errors = {
        email: [],
        password: [],
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
      let newEmailErrs = [];
      errors.password.forEach((err) => {
        if (err.type === "bad") {
          newPassworderrs.push(err);
        }
      });
      errors.email.forEach((err) => {
        if (err.type === "bad") {
          newEmailErrs.push(err);
        }
      });

      if (newPassworderrs.length === 0) {
        errors.password = null;
      }
      if (newEmailErrs.length === 0) {
        errors.email = null;
      }
      if (errors.email === null && errors.password === null) {
        errors = null;
      }
      return errors;
    },
  });

  let from = location.state?.from?.pathname || "/";

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
          <header className="mb-2">
            <h4 className="mb-1">Login</h4>
            <p className="text-muted small pt-0 mt-0">
              Welcome, let's get you logged in
            </p>
          </header>
          <form onSubmit={formik.handleSubmit} className="d-flex flex-column">
            <EmailInput
              // required
              name="email"
              {...formik.getFieldProps("email")}
              errors={formik.touched.email && formik.errors.email ? [] : null}
            />
            <PasswordInput
              required
              name="password"
              {...formik.getFieldProps("password")}
              errors={
                formik.touched.password && formik.errors.password ? [] : null
              }
            />
            <div className="d-flex justify-content-between align-items-center">
              <CheckboxInput
                divClass="form-check d-flex align-items-center my-2"
                inputClass="form-check-input border-secondary border border-2 mt-0"
                inputId="rememberUser"
                labelClass="form-check-label small text-muted p-0 ms-2 m-0"
                labelName="rememberUser"
                labelText="Keep me logged in"
                inputName="rememberUser"
                value={formik.values.checkbox}
                onChange={formik.handleChange}
              />
              <Link
                to="/forgot-password"
                className="text-primary fw-bold small text-decoration-none"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              required
              type="submit"
              value="LOGIN"
              className="btn btn-primary small p-2 rounded flex-fill fw-bold mt-2"
            />
          </form>
        </div>
      </section>
      <section className="content content-img col m-0 p-4 pb-2 container-fluid rounded-end d-flex flex-column justify-content-end">
        <img
          alt="Login Page"
          src="/images/logIn.png"
          className="content-img__image img-fluid"
        />
      </section>
    </AuthenticationLayout>
  );
};

export default Login;
