import * as React from "react";

const SvgSearch = (props) => (
	<svg
		width={12}
		height={12}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M8.226 7.547h-.494l-.175-.185A4.7 4.7 0 0 0 8.54 4.46C8.54 1.997 6.72 0 4.474 0 2.228 0 .408 1.997.408 4.46s1.82 4.46 4.066 4.46c1.007 0 1.932-.405 2.645-1.078l.17.192v.542L10.415 12l.931-1.022-3.12-3.43Zm-3.752 0c-1.558 0-2.815-1.379-2.815-3.087 0-1.709 1.257-3.088 2.815-3.088 1.557 0 2.814 1.38 2.814 3.088 0 1.708-1.257 3.087-2.814 3.087Z"
			fill="currentColor"
		/>
	</svg>
);

export default SvgSearch;
