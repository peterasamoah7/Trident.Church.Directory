import React from "react";

function SpecialInput(props) {
	return (
		<React.Fragment>
			<div className={`input-container ${props.containerClass}`}>
				<input
					type={props.type}
					className={`form-control ${props.inputClass}`}
					placeholder=" "
					style={props.style}
				/>
				{props.children}
			</div>
		</React.Fragment>
	);
}

export default SpecialInput;
