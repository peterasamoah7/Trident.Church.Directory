import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// components
import SearchInput from "../../components/inputs/specialInputs/SearchInput";
import Layout from "../../components/Layout";

// Elements
import People from "../../Elements/svgs/People";
import GreenFolder from "../../Elements/svgs/GreenFolder";
import HashTag from "../../Elements/svgs/HashTag";

import axios from "axios";

function Sacrament(props) {
  const [sacrament, setSacrament] = useState(null);

  useEffect(() => {
    getSacraments();
  }, []);

  const getSacraments = async (query = "") => {
    try {
      const request = await axios.get(
        `/api/sacrament/getmetrics?pageNumber=1&pageSize=10&query=${query}`
      );

      if (request.status === 200) {
        setSacrament(request.data);
      }
    } catch (error) {}
  };

  const handleSearch = async (value) => {
    await getSacraments(value);
  };

  return (
    <Layout>
      <main>
        <header className="d-flex justify-content-between align-items-center">
          <div>
            <h3>Sacrament Overview</h3>
            <p className="text-muted m-0">
              List of registered and approved Sacraments
            </p>
          </div>
        </header>
        <section className="my-4 d-flex align-items-center justify-content-between">
          <div className="col-4">
            <SearchInput
              label="Enter a sacrament type"
              handleSearch={handleSearch}
            />
          </div>
        </section>

        <section
          className="units mt-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3rem",
          }}
        >
          {sacrament &&
            sacrament.map((item, index) => {
              return <UnitCard key={index} item={item} index={index} />;
            })}
        </section>
      </main>
    </Layout>
  );
}

export default Sacrament;

function UnitCard(props) {
  return (
    <section className="unit-card bg-white p-4 pb-2 rounded-3">
      <header className="d-flex">
        <HashTag
          style={{
            color: `var(--bs-hash${props.index + 1})`,
          }}
        />
        <div className="ms-3">
          <h5 className="mb-0">{props.item.type}</h5>
        </div>
      </header>
      <p className="my-3 text-muted">
        This is the metrics for {props.item.type}
      </p>
      <div className="d-flex justify-content-between mt-2">
        <figure className="d-flex align-items-center">
          <People className="text-primary" />
          <figcaption className="ms-2">
            <span className="member-count">{props.item.memberCount}</span>
          </figcaption>
        </figure>
        <Link
          to={`view-sacrament/${props.item.type}`}
          className="d-flex align-items-center"
        >
          <GreenFolder />
          <span className="ms-3 ps-3 border-start border-primary border-1">
            View Sacrament
          </span>
        </Link>
      </div>
    </section>
  );
}
