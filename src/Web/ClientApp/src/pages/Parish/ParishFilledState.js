import React, { useState, useEffect } from "react";

// Stylesheet
import "../../styles/dist/table.css";

// Components
import SearchInput from "../../components/inputs/specialInputs/SearchInput";
import ParishItem from "./ParishItem";

// Elements
import Layout from "../../components/Layout";
import axios from "axios";

//

function ParishFilledState() {
  const [parishes, setParishes] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let path = "";
    getParishes(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = async () => {
    await getParishes(nextPage);
  };

  const prev = async () => {
    await getParishes(prevPage);
  };

  const getParishes = async (path = "", query = "") => {
    const request = await axios.get(
      `/api/parish?query=${query.length ? query : searchValue}&${path}`
    );

    if (request.status === 200) {
      setParishes(null);
      setParishes(request.data);
      setNextPage(
        request.data.nextPage?.slice(1, request.data.nextPage?.length)
      );
      setPrevPage(
        request.data.previousPage?.slice(1, request.data.previousPage?.length)
      );
    }
  };

  const handleSearch = async (query) => {
    setSearchValue(() => query);
    await getParishes(undefined, query);
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
            <SearchInput handleSearch={handleSearch} />
          </div>
        </div>

        <table className="bg-white">
          <thead>
            <tr>
              <th></th>
              <th>Parish Name</th>
              <th>Location</th>
              <th>Associated Priest</th>
              <th>Members</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parishes &&
              parishes.data.map((item, index) => {
                return <ParishItem index={index + 1} key={item.id} {...item} />;
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
