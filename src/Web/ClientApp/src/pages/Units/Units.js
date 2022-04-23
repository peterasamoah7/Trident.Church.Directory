import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// components
import SearchInput from "../../components/inputs/specialInputs/SearchInput";
import Layout from "../../components/Layout";

// Elements
import People from "../../Elements/svgs/People";
import GreenFolder from "../../Elements/svgs/GreenFolder";
import HashTag from "../../Elements/svgs/HashTag";
import CircledPlus from "../../Elements/svgs/CircledPlus";

import axios from "axios";

function Units(props) {
  const [groups, setGroups] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPrevPage] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const controller = new AbortController();

  //useEffect(() => {
  //   return controller.abort();
  //  });

  useEffect(() => {
    let path = "";
    getGroups(path);

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = async () => {
    await getGroups(nextPage);
  };

  const prev = async () => {
    await getGroups(prevPage);
  };

  const getGroups = async (path = "", query = "") => {
    const request = await axios.get(
      `/api/parishgroup/getall${path?.length ? path : ""}${
        query?.length
          ? path?.length
            ? `&query=${query.length ? query : searchValue}`
            : `?query=${query.length ? query : searchValue}`
          : ""
      }`,
      { signal: controller.signal }
    );

    if (request.status === 200) {
      setGroups(request.data);
      setNextPage(request.data.nextPage);
      setPrevPage(request.data.previousPage);
    }
  };

  const handleSearch = async (query) => {
    setSearchValue(() => query);
    await getGroups(undefined, query);
  };

  return (
    <Layout>
      <main>
        <header className="d-flex justify-content-between align-items-center">
          <div>
            <h3>Parish Groups Overview</h3>
            <p className="text-muted m-0">
              List of registered and approved parish groups
            </p>
          </div>
          <Link to="/groups/add-group" className="btn-group">
            <button className="btn btn-primary ">Add Group</button>
            <button className="btn btn-primary py-0">
              <CircledPlus size={25} />
            </button>
          </Link>
        </header>
        <section className="my-4 d-flex align-items-center justify-content-between">
          <div className="col-4">
            <SearchInput
              handleSearch={handleSearch}
              text="Enter a parish group name"
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
          {groups &&
            groups.data.map((item, index) => {
              return <UnitCard key={item.id} item={item} index={index} />;
            })}
        </section>

        <section className="d-flex justify-content-center">
          <div className="d-flex ">
            {previousPage?.length > 0 && (
              <div
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                className="me-3"
                onClick={prev}
              >
                {" "}
                &lt; Prev
              </div>
            )}
            {nextPage?.length > 0 && (
              <div
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={next}
              >
                Next &gt;
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Units;

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
          <h5 className="mb-0">{props.item.name}</h5>
        </div>
      </header>
      <p className="my-3 text-muted">{props.item.description}</p>
      <div className="d-flex justify-content-between mt-2">
        <figure className="d-flex align-items-center">
          <People className="text-primary" />
          <figcaption className="ms-2">
            <span className="member-count">{props.item.memberCount}</span>
          </figcaption>
        </figure>
        <Link
          to={`view-group/${props.item.id}`}
          className="d-flex align-items-center"
        >
          <GreenFolder />
          <span className="ms-3 ps-3 border-start border-primary border-1">
            View Unit
          </span>
        </Link>
      </div>
    </section>
  );
}
