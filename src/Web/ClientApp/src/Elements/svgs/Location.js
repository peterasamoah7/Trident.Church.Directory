import * as React from "react";

function Location(props) {
	return (
		<svg width="1em" height="1em" fill="none" {...props}>
			<path
				d="M5.893 0A5.9 5.9 0 000 5.893a5.833 5.833 0 001.187 3.536s.16.211.187.242L5.893 15l4.52-5.332c.024-.028.186-.24.186-.24v-.001a5.83 5.83 0 001.187-3.534A5.9 5.9 0 005.893 0zm0 8.036a2.143 2.143 0 110-4.286 2.143 2.143 0 010 4.286z"
				fill="currentColor"
				fillOpacity={props.opacity || 0.3}
			/>
		</svg>
	);
}

const MemoLocation = React.memo(Location);
export default MemoLocation;
