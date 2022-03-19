import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

// components
import ProgressBar from "../../../components/ProgressBar";
import Input from "../../../components/inputs/Input";
import DateSelect2 from "../../../components/inputs/datePickers/DateSelect2";
import Layout from "../../../components/Layout";

function BasicInformation(props) {
	const { onLayoutType, name, parish, role, phone } = props;
	const navigate = useNavigate();

	function handleCancel(e) {
		e.preventDefault();

		navigate(-1);
	}

	const formik = useFormik({
		initialValues: {
			firstName: `${name || ""}`,
			lastName: `${""}`,
			birthDate: `${""}`,
			birthPlace: `${""}`,
			email: `${""}`,
			countryCode: `${""}`,
			phone: `${phone || ""}`,
		},
		onSubmit: (values) => {
			navigate("contact-info");
		},
	});

	return (
		<Layout type={2}>
			<ProgressBar stage2="Contact Information" stage={1} />

			<form
				onSubmit={formik.handleSubmit}
				className="bg-white shadow-sm border-light rounded rounded-3 border py-3 pb-4 mt-4 d-flex flex-column"
			>
				<header className="d-flex justify-content-between align-items-center px-4 py-2 pb-4 border-bottom">
					<p className="text-muted p-0 m-0">
						The information can be edited from yuor profile page
					</p>
				</header>

				<div
					className="mx-4 my-4 inputs"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gap: "1.5rem",
					}}
				>
					<Input
						large
						noIcon
						label="First Name"
						name="firstName"
						{...formik.getFieldProps("firstName")}
					/>
					<Input
						large
						noIcon
						label="Last Name"
						name="lastName"
						{...formik.getFieldProps("lastName")}
					/>

					<DateSelect2 inputContainerClass="input-container__lg" />

					<Input
						large
						noIcon
						type="text"
						label="Place of birth"
						inputClass="form-select"
						name="birthPlace"
						{...formik.getFieldProps("birthPlace")}
					/>
					<Input
						large
						noIcon
						type="email"
						label="Email address"
						name="email"
						{...formik.getFieldProps("email")}
					/>

					<div
						className=" input-group"
						style={{
							display: "grid",
							gridTemplateColumns: "0.35fr 1fr",
						}}
					>
						<Input
							large
							noIcon
							type="text"
							label="+233"
							name="countryCode"
							{...formik.getFieldProps("countryCode")}
						/>

						<Input
							large
							noIcon
							type="tel"
							label="Phone number"
							inputStyle={{
								borderTopLeftRadius: "0",
								borderBottomLeftRadius: "0",
							}}
							name="phone"
							{...formik.getFieldProps("phone")}
						/>
					</div>
				</div>

				<div className="d-flex align-items-center justify-content-between mx-4 mb-3">
					<button
						className="btn btn-outline-primary px-5 py-2"
						onClick={handleCancel}
					>
						Cancel
					</button>
					<input
						type="submit"
						value="Next"
						className="btn btn-primary px-5 py-2"
					/>
				</div>
			</form>
		</Layout>
	);
}

export default BasicInformation;
