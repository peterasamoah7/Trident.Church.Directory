import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

// Elements
import GreenPlus from "../../../Elements/svgs/GreenPlus";

// components
import Layout from "../../../components/Layout";
import SearchInput from "../../../components/inputs/specialInputs/SearchInput";
import ProgressBar from "../../../components/ProgressBar";

function AssociatedPriestS1(props) {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			search: "",
		},
		onSubmit: (values) => {
			// after posting search Input;
			navigate("/parish/add-parish/associated-priest2");
		},
	});
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
					onSubmit={formik.handleSubmit}
				>
					<div className="px-3 py-3 border-bottom text-muted justify-content-between  d-flex align-items-center">
						<p className="m-0">Add new members into the parish</p>
						<Link
							to="/parish/add-parish/associated-priest2"
							className="text-decoration-none"
						>
							Skip this step
						</Link>
					</div>
					<div
						className="py-4 px-3 d-flex flex-column"
						style={{
							gap: "2rem",
						}}
					>
						<div
							className="d-flex align-items-center col-7"
							style={{
								gap: "0.8rem",
							}}
						>
							<SearchInput name="search" {...formik.getFieldProps("search")} />
						</div>
						<Link to="" className="d-flex align-items-center">
							<GreenPlus />
							<span className="border-start border-primary ms-2 ps-2">
								Create a new priest
							</span>
						</Link>
						<div className="d-flex align-items-center justify-content-between">
							<button
								className="btn btn-outline-primary px-5"
								onClick={() => navigate("/parish/add-parish/associated-priest")}
								type="button"
							>
								Back
							</button>
							<input
								className="btn btn-secondary px-5"
								type="submit"
								value="Next"
							/>
						</div>
					</div>
				</form>
			</main>
		</Layout>
	);
}

export default AssociatedPriestS1;
