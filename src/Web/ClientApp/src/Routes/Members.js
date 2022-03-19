import React from "react";
import { Route, Routes, useParams } from "react-router-dom";

// data from api
import data from "../pages/Members/data.json";

// Members
import Members from "../pages/Members/Members";
import MembersAddBasicInfo from "../pages/Members/AddMembers/BasicInformation";
import MembersAddContactInfo from "../pages/Members/AddMembers/ContactInformation";

// profile view
import FilledState from "../pages/Members/profileView/FilledState";

function MembersRoute() {
	return (
		<Routes>
			<Route index element={<Members />} />
			<Route path="add-member">
				<Route index element={<MembersAddBasicInfo />} />
				<Route path="contact-info" element={<MembersAddContactInfo />} />
			</Route>

			<Route path="edit-member/:id" element={<EditMembers />}></Route>
			<Route path="view-member/:id" element={<ViewMember />} />
			<Route path="view-member" element={<FilledState />} />
		</Routes>
	);
}

export default MembersRoute;

function EditMembers() {
	const params = useParams();

	let info = undefined;

	info = data.filter((value) => {
		return value.id == params.id;
	})[0];

	return (
		<Routes>
			<Route index element={<MembersAddBasicInfo {...info} />} />
			<Route path="contact-info" element={<MembersAddContactInfo />} />
		</Routes>
	);
}

function ViewMember() {
	const params = useParams();

	let info = undefined;

	info = data.filter((value) => {
		return value.id == params.id;
	})[0];

	return <FilledState {...info} />;
}
