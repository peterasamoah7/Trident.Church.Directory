import React from "react";
import { Outlet } from "react-router-dom";

import BasicInformation from "./BasicInformation";
import ContactInformation from "./ContactInformation";

function Index() {
	return (
		<>
			{" "}
			<Outlet />
		</>
	);
}

export default Index;
