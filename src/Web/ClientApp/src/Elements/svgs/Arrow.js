import * as React from "react";

const SvgArrow = (props) => (
	<svg
		width={10}
		height={20}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M5 19V1m0 0L1 5m4-4 4 4"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default SvgArrow;
