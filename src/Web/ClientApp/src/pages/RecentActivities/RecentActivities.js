import React from "react";
import { Link } from "react-router-dom";

// Components
import RecentActivity from "../../components/recentActivity/RecentActivity";
import Layout from "../../components/Layout";

import SearchInput from "../../components/inputs/specialInputs/SearchInput";
import DateSelect from "../../components/inputs/datePickers/DateSelect2";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function RecentActivities() {
  const [recentActivities, setRecentActivities] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [query] = useState("");

  const controller = new AbortController();

  //useEffect(() => {
  //   return controller.abort();
  //  });

  const fetchRecentActivities = async (path) => {
    try {
      const request = await axios.get(
        `api/dashboard/getactivity?${path?.length && path}`,
        { signal: controller.signal }
      );
      if (request.status === 200) {
        setRecentActivities(() => request.data.data);
        setNextPage(() =>
          request.data?.nextPage?.slice(1, request.data.nextPage.length)
        );
        setPreviousPage(() =>
          request.data?.previousPage?.slice(1, request.data.previousPage.length)
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchRecentActivities();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout type={1}>
      <header className="d-flex align-items-center justify-content-between">
        <h5 className="m-0">Recent Activities</h5>
        <Link to="/" className="text-decoration-none">
          &lt; Back to Dashboard
        </Link>
      </header>
      <div className="my-5 d-flex align-items-center justify-content-between">
        <div className="col-5">
          <SearchInput />
        </div>
        <div
          className="d-flex align-items-center"
          style={{
            gap: "5px",
          }}
        >
          <DateSelect label="Date" />
          <select
            name="parish"
            id="parish"
            className="form-select"
            style={{
              width: "6rem",
            }}
          >
            <option value="">Parish</option>
          </select>
          <select
            name="parish"
            id="parish"
            className="form-select sort-select"
            style={{
              width: "6rem",
            }}
          >
            <option value="">Sort</option>
          </select>
        </div>
      </div>
      <RecentActivity
        type="full"
        data={recentActivities}
        nextPage={nextPage}
        previousPage={previousPage}
        fetcher={fetchRecentActivities}
      />
    </Layout>
  );
}

export default RecentActivities;
