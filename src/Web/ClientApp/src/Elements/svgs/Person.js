import * as React from "react";

const SvgPerson = (props) => (
	<svg
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 13 15"
		width={"1em"}
		height={"1em"}
		{...props}
	>
		<path
			d="M8.473 9.179c-.093-.03-.679-.295-.313-1.408h-.005c.954-.983 1.684-2.564 1.684-4.121C9.839 1.255 8.247 0 6.396 0 4.544 0 2.961 1.255 2.961 3.65c0 1.563.725 3.151 1.686 4.132.374.982-.295 1.346-.435 1.397C2.274 9.88 0 11.157 0 12.42v.472C0 14.61 3.331 15 6.414 15c3.088 0 6.377-.39 6.377-2.109v-.473c0-1.298-2.285-2.566-4.318-3.24Z"
			fill="currentColor"
			fillOpacity={props.opacity || 0.3}
		/>
	</svg>
);

export default SvgPerson;
