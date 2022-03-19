import React from "react";
import { Routes, Route } from "react-router-dom";

// Units
import Units from "../pages/Units/Units";
import ViewUnit from "../pages/Units/ViewUnit";
import AddUnitMember from "../pages/Units/AddMembers";

function UnitsRoute() {
	return (
		<Routes>
			<Route index element={<Units />} />
			<Route path="view-unit/:id" element={<ViewUnit />} />
			<Route path="add-member" element={<AddUnitMember />} />
		</Routes>
	);
}

export default UnitsRoute;