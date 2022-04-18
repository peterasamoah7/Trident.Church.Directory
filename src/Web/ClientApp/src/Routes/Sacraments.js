import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Sacrament/Index";
import ViewSacrament from "../pages/Sacrament/ViewSacrament";

function Sacrament() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/view-sacrament/:id" element={<ViewSacrament />} />
    </Routes>
  );
}

export default Sacrament;
