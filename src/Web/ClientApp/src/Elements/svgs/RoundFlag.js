import * as React from "react";

const SvgRoundFlag = (props) => (
	<svg
		width={28}
		height={28}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<circle cx={14} cy={14} r={14} fill="currentColor" />
		<path
			d="M15.361 7.889a.694.694 0 0 0-.68-.556H9.694A.694.694 0 0 0 9 8.028v10.417a.694.694 0 1 0 1.389 0v-4.167h3.889l.166.833c.063.325.35.56.681.556h3.597a.695.695 0 0 0 .695-.695V9.417a.694.694 0 0 0-.695-.695h-3.194l-.167-.833Z"
			fill="#fff"
		/>
	</svg>
);

export default SvgRoundFlag;
