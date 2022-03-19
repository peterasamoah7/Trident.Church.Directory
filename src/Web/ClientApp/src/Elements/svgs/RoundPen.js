import * as React from "react";

const SvgRoundPen = (props) => (
	<svg
		width={props.size || 28}
		height={props.size || 28}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 28 28"
		{...props}
	>
		<circle cx={14} cy={14} r={14} fill="currentColor" />
		<path
			d="M8.661 20a.659.659 0 0 1-.485-.215.65.65 0 0 1-.173-.503l.161-1.774 7.454-7.452 2.33 2.329-7.452 7.451-1.775.161a.652.652 0 0 1-.06.003Zm9.752-8.08-2.329-2.33 1.397-1.397a.659.659 0 0 1 .932 0L19.81 9.59a.659.659 0 0 1 0 .932l-1.396 1.396v.001Z"
			fill="#fff"
		/>
	</svg>
);

export default SvgRoundPen;
