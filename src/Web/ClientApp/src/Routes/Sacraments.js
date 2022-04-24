import React from "react";
import { Route, Routes } from "react-router-dom";
import NotfoundPage from "../components/404";
import Index from "../pages/Sacrament/Index";
import ViewSacrament from "../pages/Sacrament/ViewSacrament";

function Sacrament() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/view-sacrament/:id" element={<ViewSacrament />} />
      {/* Not Found Route */}
      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  );
}

export default Sacrament;
