import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../../components/Layout";
import ProgressBar from "../../../components/ProgressBar";

import ListGroup from "../../../components/Selections/ListGroup";

// Elements
// import RedCross from "../../../Elements/svgs/RedCross";

function AssociatedPriestS2(props) {
	const [value, setValue] = useState(true);
	let items = ["one", "two", "three", "four"];

	return (
		<Layout type={2}>
			<main>
				<header className="d-flex align-items-end justify-content-between">
					<div>
						<h5>Add new parish</h5>
						<p className="text-muted m-0">
							List of registered and approved parishes
						</p>
					</div>
					<Link to="/parish" className="text-decoration-none">
						&lt; Back to Parish Overview
					</Link>
				</header>
				<ProgressBar stage={2} />
				<form
					className="bg-white p-0  shadow-sm border rounded"
					style={{
						marginTop: "2rem",
					}}
				>
					<div className="px-3 py-3 border-bottom text-muted justify-content-between  d-flex align-items-center">
						<p className="m-0">Add new members into the parish</p>
						<Link
							to="/parish/add-parish/associated-priest3"
							className="text-decoration-none"
						>
							Skip this step
						</Link>
					</div>
					<div className="selected"></div>
					{/* <select
					name="parishes"
					id="parishes"
					aria-multiselectable
					className="form-select"
				>
					<option value="Ebenezer Presbeterian">Ebenezer Presbeterian</option>
					<option value="Ebenezer Presbeterian">Ebenezer Presbeterian</option>
					<option value="Ebenezer Presbeterian">Ebenezer Presbeterian</option>
					<option value="Ebenezer Presbeterian">Ebenezer Presbeterian</option>
					<option value="Ebenezer Presbeterian">Ebenezer Presbeterian</option>
					<option value="Ebenezer Presbeterian">Ebenezer Presbeterian</option>
					</select> */}

					<ListGroup labels={items} />
				</form>
			</main>
		</Layout>
	);
}

export default AssociatedPriestS2;
