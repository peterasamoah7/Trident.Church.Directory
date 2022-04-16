import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

// components
import ProgressBar from "../../../components/ProgressBar";
import Input from "../../../components/inputs/Input";
import DateSelect2 from "../../../components/inputs/datePickers/DateSelect2";
import Layout from "../../../components/Layout";
import { useState } from "react";

function BasicInformation(props) {
  const { onLayoutType, name, parish, role, phone } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    birthPlace: "",
    email: "",
    countryCode: "",
    phone: "",
    parish: "",
    occupation: "",
    postalCode: "",
    homeAddress: "",
  });

  const [stage, setStage] = useState(1);

  function handleCancel(e) {
    e.preventDefault();

    navigate(-1);
  }

  const handleSubmit = () => {};

  // const formik = useFormik({
  //   initialValues: {
  //     firstName: `${name || ""}`,
  //     lastName: `${""}`,
  //     birthDate: `${""}`,
  //     birthPlace: `${""}`,
  //     email: `${""}`,
  //     countryCode: `${""}`,
  //     phone: `${phone || ""}`,
  //   },
  //   onSubmit: (values) => {
  //     navigate("contact-info");
  //   },
  // });

  return (
    <Layout type={2}>
      {<ProgressBar stage2="Contact Information" stage={stage} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm border-light rounded rounded-3 border py-3 pb-4 mt-4 d-flex flex-column"
      >
        <header className="d-flex justify-content-between align-items-center px-4 py-2 pb-4 border-bottom">
          <p className="text-muted p-0 m-0">
            The information can be edited from your profile page
          </p>
        </header>

        {stage == 1 ? (
          <>
            <div
              className="mx-4 my-4 inputs"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.5rem",
              }}
            >
              <Input
                large
                noIcon
                label="First Name"
                name="firstName"
                // {...formik.getFieldProps("firstName")}
                value={formData.firstName}
              />
              <Input
                large
                noIcon
                label="Last Name"
                name="lastName"
                // {...formik.getFieldProps("lastName")}
                value={formData.lastName}
              />

              <DateSelect2 inputContainerClass="input-container__lg" />

              <Input
                large
                noIcon
                type="text"
                label="Place of birth"
                inputClass="form-select"
                name="birthPlace"
                // {...formik.getFieldProps("birthPlace")}
                value={formData.birthPlace}
              />
              <Input
                large
                noIcon
                type="email"
                label="Email address"
                name="email"
                // {...formik.getFieldProps("email")}
                value={formData.email}
              />

              <div
                className=" input-group"
                style={{
                  display: "grid",
                  gridTemplateColumns: "0.35fr 1fr",
                }}
              >
                <Input
                  large
                  noIcon
                  type="text"
                  label="+233"
                  name="countryCode"
                  // {...formik.getFieldProps("countryCode")}
                  value={formData.countryCode}
                />

                <Input
                  large
                  noIcon
                  type="tel"
                  label="Phone number"
                  inputStyle={{
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                  }}
                  name="phone"
                  // {...formik.getFieldProps("phone")}
                  value={formData.phone}
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mx-4 mb-3">
              <button
                className="btn btn-outline-primary px-5 py-2"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
              <button
                type="button"
                // value=""
                className="btn btn-primary px-5 py-2"
                onClick={() => setStage(() => 2)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className="p-4"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "2rem",
              }}
            >
              <Input
                large
                noIcon
                label="Parish"
                inputClass="form-select"
                value={formData.parish}
              />
              <Input
                large
                noIcon
                label="Occupation"
                inputClass="form-select"
                value={formData.occupation}
              />
              <Input
                large
                noIcon
                label="Postal Code"
                value={formData.postalCode}
              />
              <div
                style={{
                  gridColumn: "1/-1",
                }}
              >
                <Input large noIcon label="Home Address" />
              </div>
            </div>
            <div className="mt-4 px-4 d-flex align-items-center justify-content-between">
              <button
                className="btn btn-outline-primary px-5"
                onClick={() => setStage(() => 1)}
                type="button"
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={() => console.log("first")}
                type="button"
              >
                Add new member
              </button>
            </div>
          </>
        )}
      </form>
    </Layout>
  );
}

export default BasicInformation;
