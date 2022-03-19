import React from "react";

function BlueMail(props) {
	return (
		<svg width={25} height={24} fill="none" {...props}>
			<circle cx={12.5} cy={12} r={12} fill="#1665D8" fillOpacity={0.1} />
			<path
				d="M16.86 6.98H8.327c-.485 0-.95.195-1.293.541A1.857 1.857 0 006.5 8.827v6.158c0 .49.193.96.535 1.306.343.346.808.54 1.293.54h8.531c.485 0 .95-.194 1.293-.54.343-.347.535-.816.535-1.306V8.827c0-.49-.192-.96-.535-1.306a1.819 1.819 0 00-1.293-.541zm0 1.231l-3.962 2.753a.604.604 0 01-.609 0L8.33 8.21h8.53z"
				fill="#1665D8"
				fillOpacity={0.7}
			/>
		</svg>
	);
}

export default BlueMail;
