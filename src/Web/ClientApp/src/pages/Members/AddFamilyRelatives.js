import React from "react";
import { Link } from "react-router-dom";

// components
import Input from "../../components/inputs/Input";

// Elements
import CircledPlus from "../../Elements/svgs/CircledPlus";
import SvgGreenPlus from "../../Elements/svgs/GreenPlus";

function AddFamilyRelatives({ onLayoutType }) {
	return (
		<main>
			<header className="d-flex align-items-end justify-content-between mb-4">
				<div>
					<h5>Add relatives</h5>
					<p className="m-0 tex-muted">
						List of registered and approved parishes
					</p>
				</div>
				<Link to="" className="text-decoration-none">
					&lt; Back to parish overview
				</Link>
			</header>

			<form className="bg-white shadow-sm rounded-2 border border-muted">
				<p className="text-muted border-bottom border-muted m-0 py-4 px-3">
					The information can be edited from your profile page
				</p>
				<div className="px-3 py-4">
					<select
						name="role"
						id="role"
						className="form-select mb-4"
						style={{
							paddingBlock: "0.8em",
							borderColor: "var(--bs-border2)",
						}}
					>
						<option value="">Choose a role</option>
						<option value="mother">Mother</option>
						<option value="father">Father</option>
						<option value="spouse">Spouse</option>
					</select>
					<div
						className=" mb-4 col-7 d-flex align-items-center"
						style={{
							gap: "1.3rem",
						}}
					>
						<Input
							containerClass="input-container__lg"
							inputClass="form-select"
							label="Add relative"
						/>
						<CircledPlus className="text-primary" />
					</div>

					<Link to="" className="my-4 mb-5 d-flex align-items-center">
						<SvgGreenPlus />
						<span className="ms-2 ps-2 border-start border-1 border-primary">
							Add a new relative
						</span>
					</Link>

					<div className=" mt-4 d-flex align-items-center justify-content-between">
						<button className="btn btn-outline-primary rounded-1 px-4">
							Cancel
						</button>
						<input
							type="submit"
							value="Next"
							className="btn btn-primary rounded-1 px-4"
						/>
					</div>
				</div>
			</form>
		</main>
	);
}

export default AddFamilyRelatives;
