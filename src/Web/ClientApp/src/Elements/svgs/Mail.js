import * as React from "react";

const SvgMail = (props) => (
	<svg
		viewBox="0 0 19 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		{...props}
	>
		<path
			d="M15.938 0H2.812A2.813 2.813 0 0 0 0 2.813v9.374A2.812 2.812 0 0 0 2.813 15h13.124a2.812 2.812 0 0 0 2.813-2.813V2.813A2.812 2.812 0 0 0 15.937 0Zm0 1.875-6.094 4.19a.938.938 0 0 1-.938 0l-6.094-4.19h13.126Z"
			fill="currentColor"
			fillOpacity={0.3}
		/>
	</svg>
);

export default SvgMail;
