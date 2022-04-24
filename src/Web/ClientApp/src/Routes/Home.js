import React from "react";
import { Route, Routes } from "react-router-dom";

// Home
import Dashboard from "../pages/Dashboard/Dashboard";
import InviteMember from "../pages/InviteMember/InviteMember";
import AdminUsersList from "../pages/AdminList/AdminUsersList";
import RecentActivities from "../pages/RecentActivities/RecentActivities";
import RequireAuth from "../pages/Authentication/RequireAuth";
import NotfoundPage from "../components/404";

function Home() {
  return (
    <Routes>
      {/* home */}
      <Route
        index
        path={"/"}
        element={
          <RequireAuth redirectTo={"/login"}>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="invite" element={<InviteMember />} />
      <Route
        path="admin-users"
        element={
          <RequireAuth redirectTo={"/login"}>
            <AdminUsersList />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="recent-activities"
        element={
          <RequireAuth redirectTo={"/login"}>
            <RecentActivities />{" "}
          </RequireAuth>
        }
      />

      {/* Not Found Route */}
      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  );
}

export default Home;
