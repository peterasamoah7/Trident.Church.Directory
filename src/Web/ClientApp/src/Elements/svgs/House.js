import * as React from "react";

function House(props) {
	return (
		<svg width="1em" height="1em" fill="none" {...props}>
			<path
				d="M9.687 6.928V2.755c0-.428-.17-.84-.477-1.139L7.83.236a.804.804 0 00-1.138 0L5.32 1.608a1.62 1.62 0 00-.477 1.147v.944H1.614A1.62 1.62 0 000 5.313v8.073A1.62 1.62 0 001.614 15h11.301a1.62 1.62 0 001.615-1.614V8.542a1.62 1.62 0 00-1.615-1.614H9.687zm-6.458 6.458H1.614V11.77H3.23v1.615zm0-3.23H1.614V8.543H3.23v1.615zm0-3.228H1.614V5.313H3.23v1.615zm4.843 6.458H6.458V11.77h1.614v1.615zm0-3.23H6.458V8.543h1.614v1.615zm0-3.228H6.458V5.313h1.614v1.615zm0-3.229H6.458V2.085h1.614v1.614zm4.843 9.687h-1.614V11.77h1.614v1.615zm0-3.23h-1.614V8.543h1.614v1.615z"
				fill="#000"
				fillOpacity={0.3}
			/>
		</svg>
	);
}

const MemoHouse = React.memo(House);
export default MemoHouse;
