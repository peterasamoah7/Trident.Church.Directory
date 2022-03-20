import React from "react";
import { useFormik } from "formik";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

// // Routes
// import Home from "./Routing/";
// import Units from "./Routing/Units";

// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import InviteMember from "./pages/InviteMember/InviteMember";
import AdminUsersList from "./pages/AdminList/AdminUsersList";
import RecentActivities from "./pages/RecentActivities/RecentActivities";

// Units
import Units from "./pages/Units/Units";
import ViewUnit from "./pages/Units/ViewUnit";
import AddUnitMember from "./pages/Units/AddMembers";

// Members
import Members from "./pages/Members/Members";
import MembersAddBasicInfo from "./pages/Members/AddMembers/BasicInformation";
import MembersAddContactInfo from "./pages/Members/AddMembers/ContactInformation";

//
import EmailInput from "./components/inputs/specialInputs/EmailInput";
// import SearchInput from "./components/inputs/specialInputs/SearchInput";
// import PasswordInput from "./components/inputs/specialInputs/PasswordInput";

function App() {
  const [layoutType, setLayoutType] = useState(1);
  return (
    <>
      <Layout type={layoutType}>
        <Routes>
          {/* Home */}
          <Route to="/">
            <Route index element={<Dashboard onLayoutType={setLayoutType} />} />
            <Route
              path="invite"
              element={<InviteMember onLayoutType={setLayoutType} />}
            />
            <Route
              path="admin-users"
              element={<AdminUsersList onLayoutType={setLayoutType} />}
            />
            <Route
              path="recent-activities"
              element={<RecentActivities onLayoutType={setLayoutType} />}
            />
          </Route>

          {/* Units */}
          <Route path="/units">
            <Route index element={<Units onLayoutType={setLayoutType} />} />
            <Route
              path="view-unit"
              element={<ViewUnit onLayoutType={setLayoutType} />}
            />
            <Route
              path="add-member"
              element={<AddUnitMember onLayoutType={setLayoutType} />}
            />
          </Route>

          {/* Members */}
          <Route path="/members">
            <Route index element={<Members onLayoutType={setLayoutType} />} />
            <Route path="add-member">
              <Route
                index
                element={<MembersAddBasicInfo onLayoutType={setLayoutType} />}
              />
              <Route
                path="contact-info"
                element={<MembersAddContactInfo onLayoutType={setLayoutType} />}
              />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
