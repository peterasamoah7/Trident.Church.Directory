import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

//  Styles
import "../../styles/dist/table.css";

// components
import EllipseNModal from "../../components/modal/EllipseNModal";
import SearchInput from "../../components/inputs/specialInputs/SearchInput";

// Elements
import SvgHashTag from "../../Elements/svgs/HashTag";
import Layout from "../../components/Layout";

import axios from "axios";
import { useContext } from "react";
import { ErrorContext } from "../../context/ErrorContext";

function ViewSacrament({ onLayoutType }) {
  const [members, setMembers] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [page, setPage] = useState(1);
  const { showError } = useContext(ErrorContext);

  let { id } = useParams();
  const navigate = useNavigate();

  const getSacramentMembers = async (path, query = "") => {
    try {
      const request = await axios.get(
        `/api/sacrament/getparishioners/${id}?query=${query}&${
          path?.length ? path : `pageNumber=${page}&pageSize=10`
        }`
      );

      if (request.status == 200) {
        const data = request.data;
        setMembers(() => data.data);
        setNextPage(() => data.nextPage?.slice(1, data.nextPage?.length));
        setPrevPage(() =>
          data.previousPage?.slice(1, data.previousPage?.length)
        );
      }
    } catch (error) {
      showError();
    }
  };

  const searchMember = (query) => getSacramentMembers(null, query);

  const next = () => {
    searchMember(nextPage);
  };

  const prev = () => {
    searchMember(prevPage);
  };

  useEffect(() => {
    getSacramentMembers();
  }, []);

  return (
    <Layout>
      <main>
        <header className="d-flex align-items-start justify-content-between mb-3">
          <div className="d-flex align-items-start" style={{ gap: "1rem" }}>
            <SvgHashTag style={{ color: "var(--bs-hash3)" }} />
            <div>
              <h5 className="mb-1 text-capitalize">{id}</h5>
            </div>
          </div>
          <Link to="/sacrament" className="text-decoration-none">
            &lt; Back to Sacraments Overview
          </Link>
        </header>

        <div className="d-flex align-items-center justify-content-between"></div>

        <section className="my-4 d-flex align-items-center justify-content-between">
          <div className="col-4">
            <SearchInput handleSearch={searchMember} />
          </div>
        </section>

        <div
          className="d-flex justify-content-between data-tables p-0 m-0 mt-4"
          style={{ gap: "3rem" }}
        >
          <table className="bg-white">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Role</th>
                <th>Location</th>
                <th>Phone No.</th>
                <th>Occupation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members &&
                members.map((member, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="num text-center">{index + 1}.</td>
                        <td>
                          {member.firstName} {member.lastName}
                        </td>
                        <td>{member.type}</td>
                        <td>{member.location}</td>
                        <td>{member.phoneNumber}</td>
                        <td>{member.occupation}</td>
                        <td>
                          <EllipseNModal
                            onView={() =>
                              navigate(`/members/view-member/${member.id}`)
                            }
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="7" className="small p-1">
                  <div className="d-flex align-items-center justify-content-end me-4">
                    <span className="col-5">Rows per page: </span>
                    <select
                      name="rowsPerPage"
                      id="rowsPerPage"
                      className="ms-5"
                    >
                      <option value="10" className="">
                        10
                      </option>
                    </select>
                    <div className="tableNav ms-4">
                      {prevPage && (
                        <button onClick={prev} className="btn border-none p-2">
                          &lt;
                        </button>
                      )}
                      {nextPage && (
                        <button onClick={next} className="btn border-none p-2">
                          &gt;
                        </button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
    </Layout>
  );
}

export default ViewSacrament;
