import React, { useState, useEffect } from "react";
import parishData from "./parishData.json";
import { Link } from "react-router-dom";

// Stylesheet
import "../../styles/dist/table.css";

// Components
import SearchInput from "../../components/inputs/specialInputs/SearchInput";
import DateSelect from "../../components/inputs/datePickers/DateSelect";
import ParishItem from "./ParishItem";

// Elements
import CircledPlus from "../../Elements/svgs/CircledPlus";
import Layout from "../../components/Layout";
import axios from "axios";

//

function ParishFilledState() {
  const [parishes, setParishes] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    let path = "";
    getParishes(path);
  }, []);

  const next = () => {
    getParishes(nextPage);
  };

  const prev = () => {
    getParishes(prevPage);
  };

  const getParishes = (path) => {
    axios.get(`/api/parish/${path}`).then((response) => {
      if (response.status === 200) {
        setParishes(null);
        setParishes(response.data);
        setNextPage(response.data.nextPage);
        setPrevPage(response.data.previousPage);
      } else {
        //show errors
      }
    });
  };

  return (
    <Layout type={1}>
      <main className="">
        <header className="d-flex justify-content-between align-items-center py-2">
          <div className="d-flex flex-column align-items-start me-auto">
            <h4>Parish Overview</h4>
            <p className="text-muted">
              List of registered and approved parishes
            </p>
          </div>
        </header>
        <div className="my-3 d-flex align-items-center justify-content-between">
          <div className="col-4">
            <SearchInput />
          </div>
        </div>

        <table className="bg-white">
          <thead>
            <tr>
              <th>Parish Name</th>
              <th>Location</th>
              <th>Associated Priest</th>
              <th>Members</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parishes &&
              parishes.data.map((item) => {
                return <ParishItem key={item.id} {...item} />;
              })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7" className="small p-1">
                <div className="d-flex align-items-center justify-content-end me-4">
                  <span className="col-5">Rows per page: </span>
                  <select name="rowsPerPage" id="rowsPerPage" className="ms-5">
                    <option value="10" className="">
                      {parishes && parishes.data.length}
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
      </main>
    </Layout>
  );
}

export default ParishFilledState;
