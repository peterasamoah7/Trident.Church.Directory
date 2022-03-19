import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

// components
import Input from "../../../components/inputs/Input";

import ProgressBar from "../../../components/ProgressBar";
import Layout from "../../../components/Layout";

// elements
import Parish from "../../../Elements/svgs/Parish";
import Calendar from "../../../Elements/svgs/Calendar";
import Location from "../../../Elements/svgs/Location";
import EmojiMail from "../../../Elements/svgs/EmojiMail";
import House from "../../../Elements/svgs/House";

// data
import data from "../parishData.json";

function AddParish_BasicInfo(props) {
	const { parishName, location, creationDate, id } = props;
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			parish: `${parishName || ""}`,
			date: `${creationDate || ""}`,
			postalCode: "",
			region: `${location || ""}`,
			country: "",
		},
		onSubmit: (values) => {
			// After form submission;

			// navigate to associated priest page
			if (props.id) {
				console.log("yeahy");
				navigate(`/parish/edit-parish/associated-priest/${id}`);
			} else navigate("associated-priest");
		},
		validate: (values) => {
			let errors = {};

			if (!values.date) {
				errors.date = [{ msg: "This is a required field", type: "bad" }];
			}
			if (!values.parish) {
				errors.parish = [{ msg: "This is a required field", type: "bad" }];
			}
			if (!values.postalCode) {
				errors.postalCode = [{ msg: "This is a required field", type: "bad" }];
			}
			if (!values.region) {
				errors.region = [{ msg: "This is a required field", type: "bad" }];
			}
			if (!values.country) {
				errors.country = [{ msg: "This is a required field", type: "bad" }];
			}
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

				<ProgressBar stage={1} />

				<form
					className="bg-white p-0 shadow-sm border rounded"
					style={{
						marginTop: "2rem",
					}}
					onSubmit={formik.handleSubmit}
				>
					<p className="text-muted px-4 py-4 border-bottom border-muted me-5">
						The information can be edited from your profile page
					</p>

					<div className="px-4 py-3">
						<Input
							name="parish"
							{...formik.getFieldProps("parish")}
							errors={
								formik.errors.parish && formik.touched.parish
									? formik.errors.parish
									: null
							}
							label="Parish Name"
							type="text"
							iconOne={<Parish className="icon-one" />}
							large
						/>

						<div
							className=" "
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(2, 1fr)",
								gap: "2rem",
								marginTop: "2rem",
							}}
						>
							<Input
								name="date"
								{...formik.getFieldProps("date")}
								errors={
									formik.errors.date && formik.touched.date
										? formik.errors.date
										: null
								}
								type="text"
								large
								label="DD/MM/YYYY"
								iconOne={<Calendar className="icon-one" />}
							/>

							<Input
								name="postalCode"
								{...formik.getFieldProps("postalCode")}
								errors={
									formik.errors.postalCode && formik.touched.postalCode
										? formik.errors.postalCode
										: null
								}
								type="text"
								large
								label="Postal Code"
								iconOne={<EmojiMail className="icon-one" />}
							/>

							<Input
								name="region"
								{...formik.getFieldProps("region")}
								errors={
									formik.errors.region && formik.touched.region
										? formik.errors.region
										: null
								}
								type="text"
								large
								label="Region"
								iconOne={<House className="icon-one" />}
							/>

							<Input
								name="country"
								{...formik.getFieldProps("country")}
								errors={
									formik.errors.country && formik.touched.country
										? formik.errors.country
										: null
								}
								type="text"
								large
								label="Country"
								iconOne={<Location className="icon-one" />}
							/>
						</div>
						<div className="d-flex my-4 mb-4 align-items-center justify-content-between">
							<button
								className="px-5 btn rounded-0 btn-outline-primary"
								type="button"
							>
								Cancel
							</button>
							<button className="px-5 btn rounded-0 btn-primary" type="submit">
								Next
							</button>
						</div>
					</div>
				</form>
			</main>
		</Layout>
	);
}

export default AddParish_BasicInfo;
