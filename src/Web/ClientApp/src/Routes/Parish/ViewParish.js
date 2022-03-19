import React from "react";
import { Route, Routes, useParams } from "react-router-dom";

// data
import data from "../../pages/Parish/parishData.json";

// components
import ParishView from "../../pages/Parish/ViewParish/ViewParishFilled";

function ViewParish() {
	const params = useParams();

	let info = undefined;
	if (params) {
		info = data.filter((value) => {
			return value.id == params.id;
		})[0];
	}

	console.log(params);

	return (
		<Routes>
			<Route path="/parish/view-parish/:id" element={<ParishView />} />
		</Routes>
	);
}

export default ViewParish;
