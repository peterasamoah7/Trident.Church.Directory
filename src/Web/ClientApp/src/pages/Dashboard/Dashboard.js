import React, { useState, useEffect } from "react";
import "./Dashboard.css";

// Inputs
import { Link, useNavigate } from "react-router-dom";

// components
import GrowthCard from "../../components/cards/GrowthCard";
import RecentActivity from "../../components/recentActivity/RecentActivity";

// icons
import GreenFolder from "../../Elements/svgs/GreenFolder";
import CircledPlus from "../../Elements/svgs/CircledPlus";
import SummaryCard from "../../components/cards/SummaryCard";

//  Layout
import Layout from "../../components/Layout";

import axios from "axios";

const Dashboard = ({ onLayoutType }) => {
  const [viewModel, setViewModel] = useState(null);
  const navigate = useNavigate();

  const controller = new AbortController();

  const fetchDashboard = async () => {
    try {
      const request = await axios.get("api/dashboard/getdashboard", {
        signal: controller.signal,
      });

      if (request.status === 200) {
        setViewModel(request.data);
      }

      // if (request.status == 401) {
      //   navigate("/login");
      // }
    } catch (error) {
      console.log();
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchDashboard();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout type={1}>
      <div className="dashboard">
        <div className="links d-flex align-items-center">
          <Link to="admin-users" className="d-flex align-items-center">
            <GreenFolder />
            <span className="ms-3 ps-3 border-start border-primary border-2">
              View All Users
            </span>
          </Link>
          <Link to="invite" className="btn-group">
            <button className="btn btn-primary">Invite User</button>
            <button className="btn btn-primary">
              <CircledPlus />
            </button>
          </Link>
        </div>
        <div className="gChart">
          <div
            className="d-flex align-items-center justify-content-between"
            style={{
              gap: "2rem",
            }}
          >
            <h6 className="m-0">Church growth chart</h6>
            <div
              style={{
                width: "10rem",
              }}
            ></div>
          </div>
          <div className="cards mt-4">
            {viewModel?.metrics &&
              viewModel?.metrics.map((card, index) => {
                let { title, summary, metric, increased } = card;
                return (
                  <GrowthCard
                    title={title}
                    style={increased ? "good" : "bad"}
                    summary={summary}
                    metric={metric}
                    key={index}
                  />
                );
              })}
          </div>
        </div>
        <RecentActivity
          style={{
            fontSize: "0.95rem",
          }}
          type={null}
          data={viewModel?.audits}
        />
        <div className="sumCards">
          <SummaryCard type="parish" total={viewModel?.totalParishes} />
          <SummaryCard type="members" total={viewModel?.totalMembers} />
          <SummaryCard type="units" total={viewModel?.totalUnits} />
          <SummaryCard type="sacraments" total={viewModel?.totalSacraments} />
        </div>
        <footer
          className="footer d-flex align-items-center small justify-content-center"
          style={{
            gap: "1rem",
          }}
        >
          <span className="fw-bold small">&copy; 2021</span>
          <Link to="" className="text-primary text-decoration-none">
            &bull; Privacy Policy
          </Link>
          <Link to="" className="text-primary text-decoration-none">
            &bull; Terms & Condition
          </Link>
        </footer>
      </div>
    </Layout>
  );
};

export default Dashboard;
