import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import ViewParishEmpty from "./ViewParishEmpty";
import ViewParishFilled from "./ViewParishFilled";
import Layout from "../../../components/Layout";

// Elements
import Location from "../../../Elements/svgs/Location";

import Person2 from "../../../Elements/svgs/Person2";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewParish(props) {
  const [parish, setParish] = useState(null);

  let params = useParams();
  useEffect(() => {
    axios.get(`/api/parish/${params.id}`).then((response) => {
      if (response.status === 200) {
        setParish(response.data);
      } else {
        //show errors
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout type={1}>
      <main>
        <header className="d-flex justify-content-between align-items-start">
          <div>
            <h5>{`${parish?.name || "Parish Name"}`}</h5>
            <div
              className="text-muted d-flex align-items-center"
              style={{
                gap: "8px",
              }}
            >
              <Location className="text-primary" opacity={1} />
              <p className="m-0 ">{`${parish?.location || "location"}`}</p>
            </div>
          </div>
          <Link to="/parish" className="text-decoration-none">
            &lt; Back to Parish Overview
          </Link>
        </header>
        <section className="mt-4">
          <h6>{`${parish?.priest?.firstName || ""} ${
            parish?.priest?.lastName || ""
          }`}</h6>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center" style={{ gap: "3rem" }}>
              <p
                className="d-flex align-items-center"
                style={{
                  gap: "0.9em",
                }}
              >
                <Person2 />
                <span>
                  {" "}
                  {parish?.memberCount === 1
                    ? `${parish?.memberCount} member`
                    : `${parish?.memberCount} members`}
                </span>
              </p>
            </div>
          </div>
        </section>
        {/* <section
					className="d-flex bg-white container-fluid py-2 justify-content-between my-4 nav-secondary"
					style={{
						paddingInline: "15%",
					}}
				>
					<span className="nav-link ms-5 px-2 active">Members</span>
					<span className="nav-link ms-5 px-2">Units</span>
				</section> */}

        {/* <ViewParishEmpty /> */}
        {parish?.memberCount > 0 && <ViewParishFilled />}
      </main>
    </Layout>
  );
}

export default ViewParish;
