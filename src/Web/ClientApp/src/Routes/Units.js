import React from "react";
import { Routes, Route } from "react-router-dom";

// Units
import Units from "../pages/Units/Units";
import ViewUnit from "../pages/Units/ViewUnit";
import AddUnitMember from "../pages/Units/AddMembers";
import CreateUnit from "../pages/Units/CreateUnit";
import EditUnit from "../pages/Units/EditGroup";
import NotfoundPage from "../components/404";

function UnitsRoute() {
  return (
    <Routes>
      <Route index element={<Units />} />
      <Route path="add-group" element={<CreateUnit />} />
      <Route path="view-group/:id" element={<ViewUnit />} />
      <Route path="add-member/:id" element={<AddUnitMember />} />
      <Route path="edit-group/:id" element={<EditUnit />} />
      {/* Not Found Route */}
      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  );
}

export default UnitsRoute;
