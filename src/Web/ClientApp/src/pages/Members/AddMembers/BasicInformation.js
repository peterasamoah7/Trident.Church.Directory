import React from "react";
import { useNavigate } from "react-router-dom";

// components
import ProgressBar from "../../../components/ProgressBar";
import Input from "../../../components/inputs/Input";
import DateSelect2 from "../../../components/inputs/datePickers/DateSelect2";
import Layout from "../../../components/Layout";
import { useState } from "react";
import { useContext } from "react";
import { ErrorContext } from "../../../context/ErrorContext";
import axios from "axios";

function BasicInformation(props) {
  const navigate = useNavigate();
  const { showError } = useContext(ErrorContext);
  const [birthDate, setBirthDate] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthPlace: "",
    email: "",

    phone: "",
    location: "",
    occupation: "",
    postalCode: "",
    homeAddress: "",
  });

  const [stage, setStage] = useState(1);

  function handleCancel(e) {
    e.preventDefault();

    navigate(-1);
  }

  const moveToNext = () => {
    if (!formData.firstName.length) {
      showError("Please the field First name cannot be blank");
      return;
    }
    if (!formData.lastName.length) {
      showError("Please the field Last name cannot be blank");
      return;
    }
    if (!birthDate) {
      showError("Please the field Birth date cannot be blank");
      return;
    }
    //uncomment code below after peter fixes the birthplace thingy;
    // if (!formData.birthPlace.length) {
    //   showError("Please the field Birth place cannot be blank");
    //   return;
    // }
    if (!formData.email.length) {
      showError("Please the field Email cannot be blank");
      return;
    }
    if (!formData.phone.length) {
      showError("Please the field Phone cannot be blank");
      return;
    }

    setStage(() => 2);
  };

  const handleSubmit = async () => {
    if (!formData.location.length) {
      showError("Please the field Location cannot be blank");
      return;
    }
    const data = {
      ...formData,
      birthOfDate: new Date(birthDate),
    };

    // make request to api to api member profile
    try {
      const request = await axios.post(`/api/parishioner/create`, data);
      if (request.status === 200 || request.status === 201) {
        const data = request.data;
        showError("Member Successfully Created", "success");
        navigate(`/members/view-member/${data.id}`);
      }
    } catch (error) {
      showError("An unexpected error occurred");
    }
  };

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

        {stage === 1 ? (
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
                onChange={(e) => {
                  e.persist();
                  setFormData((oldState) => ({
                    ...oldState,
                    firstName: e.target.value,
                  }));
                }}
              />
              <Input
                large
                noIcon
                label="Last Name"
                name="lastName"
                // {...formik.getFieldProps("lastName")}
                value={formData.lastName}
                onChange={(e) => {
                  e.persist();
                  setFormData((oldState) => ({
                    ...oldState,
                    lastName: e.target.value,
                  }));
                }}
              />

              <DateSelect2
                date={birthDate}
                setDate={setBirthDate}
                inputContainerClass="input-container__lg"
              />

              <Input
                large
                noIcon
                type="text"
                label="Place of birth"
                inputClass="form-select"
                name="birthPlace"
                // {...formik.getFieldProps("birthPlace")}
                value={formData.birthPlace}
                onChange={(e) => {
                  e.persist();
                  setFormData((oldState) => ({
                    ...oldState,
                    birthPlace: e.target.value,
                  }));
                }}
              />
              <Input
                large
                noIcon
                type="email"
                label="Email address"
                name="email"
                // {...formik.getFieldProps("email")}
                value={formData.email}
                onChange={(e) => {
                  e.persist();
                  setFormData((oldState) => ({
                    ...oldState,
                    email: e.target.value,
                  }));
                }}
              />

              <div
                className=" input-group"
                // style={{
                //   display: "grid",
                //   gridTemplateColumns: "0.35fr 1fr",
                // }}
              >
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
                  onChange={(e) => {
                    e.persist();
                    setFormData((oldState) => ({
                      ...oldState,
                      phone: e.target.value,
                    }));
                  }}
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
                onClick={moveToNext}
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
                label="Location"
                inputClass="form-select"
                value={formData.location}
                onChange={(e) => {
                  e.persist();
                  setFormData((oldState) => ({
                    ...oldState,
                    location: e.target.value,
                  }));
                }}
              />
              <Input
                large
                noIcon
                label="Occupation"
                inputClass="form-select"
                value={formData.occupation}
                onChange={(e) => {
                  e.persist();
                  setFormData((oldState) => ({
                    ...oldState,
                    occupation: e.target.value,
                  }));
                }}
              />
              <Input
                large
                noIcon
                label="Postal Code"
                value={formData.postalCode}
                onChange={(e) => {
                  e.persist();
                  setFormData((oldState) => ({
                    ...oldState,
                    postalCode: e.target.value,
                  }));
                }}
              />
              <div
                style={{
                  gridColumn: "1/-1",
                }}
              >
                <Input
                  large
                  noIcon
                  label="Home Address"
                  value={formData.homeAddress}
                  onChange={(e) => {
                    e.persist();
                    setFormData((oldState) => ({
                      ...oldState,
                      homeAddress: e.target.value,
                    }));
                  }}
                />
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
                onClick={handleSubmit}
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
