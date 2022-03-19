import React from "react";
import "./input.css";

function Input({
	large,
	noIcon,
	type,
	errors,
	iconOne,
	iconTwo,
	label,
	//
	value,
	name,
	onChange,
	onBlur,
}) {
	return (
		<div
			className={`input-container ${large ? "input-container__lg" : ""} ${
				noIcon ? "icon-0" : ""
			} ${errors ? "input-error" : ""}`}
		>
			<label>
				{iconOne}
				<input
					type={type || "text"}
					className="input form-control"
					placeholder=" "
					autoComplete="off"
					//
					value={value}
					name={name}
					onChange={onChange}
					onBlur={onBlur}
				/>
				<span className="input-label">{label}</span>
			</label>
			{iconTwo}
			<section
				className="error-msg container-fluid px-0"
				style={{
					position: "relative",
				}}
			>
				{
					<ul
						style={{
							position: "absolute",
						}}
					>
						{errors
							? errors.map((error, index) => {
									return (
										<li key={index} className={error.type}>
											{error.msg}
										</li>
									);
							  })
							: null}
					</ul>
				}
			</section>
		</div>
	);
}

export default Input;
