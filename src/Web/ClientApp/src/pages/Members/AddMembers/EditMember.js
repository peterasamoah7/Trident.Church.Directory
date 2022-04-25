import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// components
import ProgressBar from "../../../components/ProgressBar";
import Input from "../../../components/inputs/Input";
import DateSelect2 from "../../../components/inputs/datePickers/DateSelect2";
import Layout from "../../../components/Layout";
import { useState, useEffect, useContext } from "react";
import { ErrorContext } from "../../../context/ErrorContext";

function EditMember(props) {
  const navigate = useNavigate();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const { showError } = useContext(ErrorContext);

  const controller = new AbortController();

  //useEffect(() => {
  //   return controller.abort();
  //  });

  const params = useParams();

  const fetchMember = async () => {
    try {
      const request = await axios.get(`/api/parishioner/get/${params.id}`, {
        signal: controller.signal,
      });

      if (request.status === 200) {
        const data = request.data;
        setFormData(() => ({
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          birthPlace: data.birthPlace ?? "",
          email: data.email ?? "",
          countryCode: data.countryCode ?? "",
          phoneNumber: data.phoneNumber ?? "",
          occupation: data.occupation ?? "",
          postalCode: data.postalCode ?? "",
          homeAddress: data.homeAddress ?? "",
          location: data?.location ?? "",
        }));
        setDateOfBirth(() =>
          data.dateOfBirth ? formatDate(data.dateOfBirth) : ""
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchMember();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    birthPlace: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    occupation: "",
    postalCode: "",
    homeAddress: "",
    location: "",
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
    if (!dateOfBirth) {
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
    if (!formData.phoneNumber.length) {
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
      dateOfBirth: dateOfBirth,
    };

    // make request to api to api member profile
    try {
      const request = await axios.put(
        `/api/parishioner/update/${params.id}`,
        data,
        { signal: controller.signal }
      );
      if (request.status === 200 || request.status === 201) {
        showError("Profile Successfully Updated", "success");
        navigate(`/members/view-member/${params.id}`);
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

              {/* <DateSelect2
                date={formData.birthDate && new Date(formData.birthDate)}
                inputContainerClass="input-container__lg"
              /> */}

              <DateSelect2
                date={dateOfBirth}
                setDate={setDateOfBirth}
                label={"Date of Birth"}
                inputContainerClass="input-container__lg"
              />

              {/* <Input
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
              /> */}
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
                  onChange={(e) => {
                    e.persist();
                    setFormData((oldState) => ({
                      ...oldState,
                      countryCode: e.target.value,
                    }));
                  }}
                  disabled={true}
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
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    e.persist();
                    setFormData((oldState) => ({
                      ...oldState,
                      phoneNumber: e.target.value,
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
              {/* <div
                style={{
                  gridColumn: "1/-1",
                }}
              > */}
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
              {/* </div> */}
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
                Save Changes
              </button>
            </div>
          </>
        )}
      </form>
    </Layout>
  );
}

export default EditMember;
