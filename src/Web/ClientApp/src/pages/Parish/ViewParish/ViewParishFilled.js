import React, { useState, useEffect } from "react";
import "../../../styles/dist/table.css";

// Components
import SearchInput from "../../../components/inputs/specialInputs/SearchInput";
import { useParams } from "react-router-dom";
import axios from "axios";

// Elements

function ViewParishFilled() {
  const [members, setMemebers] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  let params = useParams();

  useEffect(() => {
    let path = "";
    getMembers(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = () => {
    getMembers(nextPage);
  };

  const prev = () => {
    getMembers(prevPage);
  };

  const getMembers = (path) => {
    axios
      .get(`/api/parish/${params.id}/parishioners/${path}`)
      .then((response) => {
        if (response.status === 200) {
          setMemebers(null);
          setMemebers(response.data);
          setNextPage(response.data.nextPage);
          setPrevPage(response.data.previousPage);
        } else {
          //show errors
        }
      });
  };

  return (
    <>
      <section className="d-flex justify-content-between align-items-center pb-4">
        <div className="col-4">
          <SearchInput />
        </div>
      </section>
      <div
        className="d-flex justify-content-between data-tables p-0 m-0"
        style={{
          gap: "3rem",
        }}
      >
        <table className="bg-white">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Location</th>
              <th>Phone No.</th>
            </tr>
          </thead>
          <tbody>
            {members?.data?.map((item, index) => {
              return <ParishMembers key={index} {...item} />;
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7" className="small p-1">
                <div className="d-flex align-items-center justify-content-end me-4">
                  <span className="col-5">Rows per page: </span>
                  <select name="rowsPerPage" id="rowsPerPage" className="ms-5">
                    <option value="10" className="">
                      {members && members.data.length}
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
    </>
  );
}

export default ViewParishFilled;

function ParishMembers(props) {
  return (
    <tr>
      <td>
        {props.firstName} {props.lastName}
      </td>
      <td>{props.email}</td>
      <td>{props.type}</td>
      <td>{props.location}</td>
      <td>{props.phoneNumber}</td>
    </tr>
  );
}
