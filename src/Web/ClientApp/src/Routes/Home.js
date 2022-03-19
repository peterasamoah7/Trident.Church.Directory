import React from "react";
import { Route, Routes } from "react-router-dom";

// Home
import Dashboard from "../pages/Dashboard/Dashboard";
import InviteMember from "../pages/InviteMember/InviteMember";
import AdminUsersList from "../pages/AdminList/AdminUsersList";
import RecentActivities from "../pages/RecentActivities/RecentActivities";

function Home() {
	return (
		<Routes>
			{/* home */}
			<Route index element={<Dashboard />} />
			<Route path="invite" element={<InviteMember />} />
			<Route path="admin-users" element={<AdminUsersList />} />
			<Route path="recent-activities" element={<RecentActivities />} />
		</Routes>
	);
}

export default Home;
