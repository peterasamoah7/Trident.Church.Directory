import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

// Elements
import GreenPlus from "../../../Elements/svgs/GreenPlus";
import CircledPlus from "../../../Elements/svgs/CircledPlus";
import Person from "../../../Elements/svgs/Person";

// components
import Input from "../../../components/inputs/Input";
import ProgressBar from "../../../components/ProgressBar";
import Layout from "../../../components/Layout";

function AssociatedPriest(props) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      priest: "",
    },
    onSubmit: (values) => {
      // After submission;
      navigate("/parish/add-parish/associated-priest1");
    },
  });

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
          className="bg-white p-0  shadow-sm border rounded"
          style={{
            marginTop: "2rem",
          }}
          onSubmit={formik.handleSubmit}
        >
          <div className="px-3 py-3 border-bottom text-muted justify-content-between  d-flex align-items-center">
            <p className="m-0">Add new members into the parish</p>
            <Link
              to="/parish/add-parish/associated-priest1"
              className="text-decoration-none"
            >
              Skip this step
            </Link>
          </div>
          <div
            className="py-4 px-3 d-flex flex-column"
            style={{
              gap: "2rem",
            }}
          >
            <div
              className="d-flex align-items-center col-6"
              style={{
                gap: "0.8rem",
              }}
            >
              <Input
                iconOne={<Person className="icon-one" />}
                type="text"
                label="Assign Priest"
                name="priest"
                {...formik.getFieldProps("priest")}
              />
              <span className="btn text-primary me-4 p-1">
                <CircledPlus />
              </span>
            </div>
            <Link to="" className="d-flex align-items-center">
              <GreenPlus />
              <span className="border-start border-primary ms-2 ps-2">
                Create a new priest
              </span>
            </Link>
            <div className="d-flex align-items-center justify-content-between">
              <button
                className="btn btn-outline-primary px-5"
                onClick={() => navigate("/parish")}
                type="button"
              >
                Back
              </button>
              <button className="btn btn-secondary px-5" type="submit">
                Next
              </button>
            </div>
          </div>
        </form>
      </main>
    </Layout>
  );
}

export default AssociatedPriest;
