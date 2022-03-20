import React from "react";
import { Route, Routes, useParams } from "react-router-dom";

// parish pages
import ParishFilledState from "../pages/Parish/ParishFilledState";

// edit parish
import EditParish from "./Parish/EditParish";

// Add-parish
import BasicInfo from "../pages/Parish/AddParish/BasicInfo";
import AssociatedPriest from "../pages/Parish/AddParish/AssociatedPriest";
import AssociatedPriestS1 from "../pages/Parish/AddParish/AssociatedPriestS1";
import AssociatedPriestS2 from "../pages/Parish/AddParish/AssociatedPriestS2";
import AssociatedPriestS3 from "../pages/Parish/AddParish/AssociatedPriestS3";

// View Parish
// import ViewParish from "./Parish/ViewParish";

// data
import data from "../pages/Parish/parishData.json";

// components
import ParishView from "../pages/Parish/ViewParish/index";

function Parish() {
  return (
    <Routes>
      <Route index element={<ParishFilledState />} />
      <Route path="add-parish/*" element={<AddParish />} />
      <Route path="/view-parish/:id" element={<ViewParish />} />
      <Route path="edit-parish/*" element={<EditParish />} />
    </Routes>
  );
}

export default Parish;

function AddParish() {
  return (
    <Routes>
      <Route index element={<BasicInfo />} />
      <Route path="associated-priest" element={<AssociatedPriest />} />
      <Route path="associated-priest1" element={<AssociatedPriestS1 />} />
      <Route path="associated-priest2" element={<AssociatedPriestS2 />} />
      <Route path="associated-priest3" element={<AssociatedPriestS3 />} />
    </Routes>
  );
}

//
//
//
function ViewParish() {
  const params = useParams();

  let info = undefined;
  if (params) {
    info = data.filter((value) => {
      return value.id == params.id;
    })[0];
  }

  console.log(info);

  return <ParishView {...info} />;
}
