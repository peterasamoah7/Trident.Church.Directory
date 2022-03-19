import * as React from "react";

function Info(props) {
	return (
		<svg width={24} height={24} fill="none" {...props}>
			<circle cx={12} cy={12} r={12} fill="#558FE3" fillOpacity={0.1} />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18 12a6 6 0 11-12 0 6 6 0 0112 0zm-5.25-3a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-1.5 2.25a.75.75 0 100 1.5V15a.75.75 0 00.75.75h.75a.75.75 0 100-1.5V12a.75.75 0 00-.75-.75h-.75z"
				fill="#558FE3"
				fillOpacity={0.7}
			/>
		</svg>
	);
}

export default Info;
