import React from "react";
import "./normalInput.css";

function Input(props) {
	return (
		<React.Fragment>
			<div
				className={`input-container ${props.containerClass}`}
				style={props.containerStyle}
			>
				<input
					type={props.type}
					className={`form-control ${props.inputClass}`}
					placeholder=" "
					style={props.inputStyle}
				></input>
				<label className="input-label">{props.label || "label"}</label>
				{props.children}
			</div>
		</React.Fragment>
	);
}

export default Input;
