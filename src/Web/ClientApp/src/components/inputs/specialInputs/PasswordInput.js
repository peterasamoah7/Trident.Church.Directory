import React, { useState } from "react";

import "../input.css";

import Password from "../../../Elements/svgs/Password";
import EyeOpen from "../../../Elements/svgs/EyeOpen";
import EyeClosed from "../../../Elements/svgs/EyeClosed";

function PasswordInput({
	large,
	noIcon,
	errors,
	label,
	//
	value,
	name,
	onChange,
	onBlur,
}) {
	const [shown, setShown] = useState(false);

	return (
		<div
			className={`input-container ${large ? "input-container__lg" : ""} ${
				noIcon ? "icon-0" : ""
			} ${errors ? "input-error" : ""}`}
		>
			<label>
				<Password className="icon-one" />
				<input
					required
					type={shown ? "text" : "password"}
					className="input form-control"
					placeholder=" "
					autoComplete="off"
					//
					value={value}
					name={name}
					onChange={onChange}
					onBlur={onBlur}
				/>
				<span className="input-label">{label || "Password"}</span>
			</label>
			<div className="icon-two text-muted" onClick={() => setShown(!shown)}>
				{shown ? <EyeClosed /> : <EyeOpen />}
			</div>
			<section className="error-msg">
				<ul>
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
			</section>
		</div>
	);
}

export default PasswordInput;
