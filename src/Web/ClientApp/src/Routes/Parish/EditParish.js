import React from "react";
import { Route, Routes, useParams } from "react-router-dom";

// import data from server
import data from "../../pages/Parish/parishData.json";

// Add-parish
import BasicInfo from "../../pages/Parish/AddParish/BasicInfo";
import AssociatedPriest from "../../pages/Parish/AddParish/AssociatedPriest";
import AssociatedPriestS1 from "../../pages/Parish/AddParish/AssociatedPriestS1";
import AssociatedPriestS2 from "../../pages/Parish/AddParish/AssociatedPriestS2";
import AssociatedPriestS3 from "../../pages/Parish/AddParish/AssociatedPriestS3";

function EditParish() {
  const params = useParams();

  let info = undefined;

  info = data.filter((value) => {
    return value.id === params.id;
  })[0];

  return (
    <Routes>
      <Route path="basic-info/:id" element={<Basics />} />
      <Route
        path="associated-priest/:id"
        element={<AssociatedPriest {...info} />}
      />
      <Route path="associated-priest1" element={<AssociatedPriestS1 />} />
      <Route path="associated-priest2" element={<AssociatedPriestS2 />} />
      <Route path="associated-priest3" element={<AssociatedPriestS3 />} />
    </Routes>
  );
}

export default EditParish;

function Basics() {
  const params = useParams();

  let info = undefined;

  info = data.filter((value) => {
    return value.id === params.id;
  })[0];

  return <BasicInfo {...info} />;
}
