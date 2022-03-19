import React from "react";

const CheckboxInput = (props) => {
	return (
		<>
			<div className={props.divClass}>
				<input
					className={props.inputClass}
					type="checkbox"
					id={props.inputId}
					checked={props.value}
					onChange={props.onChange}
					name={props.inputName}
				/>
				<label className={props.labelClass} htmlFor={props.labelName}>
					{props.labelText}
				</label>
			</div>
		</>
	);
};

export default CheckboxInput;
