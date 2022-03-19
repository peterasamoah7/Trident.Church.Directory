import * as React from "react";

function EmojiMail(props) {
	return (
		<svg width="1em" height="1em" fill="none" {...props}>
			<path
				d="M8.906 6.382H2.344c-.515 0-.937.395-.937.879v3.995c0 .483.422.879.937.879h6.563c.515 0 .937-.396.937-.879V7.261c0-.484-.422-.88-.938-.88zm.609 4.874c0 .303-.273.55-.609.55H2.344c-.335 0-.608-.247-.608-.55V7.26c0-.303.273-.55.608-.55h6.563c.335 0 .608.247.608.55v3.995z"
				fill="#000"
				fillOpacity={0.3}
			/>
			<path
				d="M3.311 9.802l-.368-1.493h-.616v1.898h.395V8.923a11.852 11.852 0 00-.003-.309l.38 1.593h.412l.383-1.593-.001.154-.002.155v1.284h.395V8.31h-.609l-.366 1.493zM5.256 8.31l-.723 1.897h.443l.137-.39h.746l.133.39h.459L5.734 8.31h-.478zm-.028 1.18l.263-.747.255.747h-.518zm1.446-1.18h.42v1.897h-.42V8.31zm1.239 0h-.424v1.897h1.434v-.341h-1.01V8.309zm-6.367-2.9h8.091c.01-.259.023-.506.041-.742.125-1.673.462-2.775.89-3.428H3.305c-.756 0-1.76 1.115-1.76 4.17z"
				fill="#000"
				fillOpacity={0.3}
			/>
			<path
				d="M12.919.472V.47H3.018C1.982.469.468 1.996.468 6.182v8.35h1.598v-1.318h7.339v1.317h1.376l.675-.318v-1.316l1.463-.685v.867h.937l.675-.319V4.865c0-2.405-.594-4.356-1.612-4.392zm-2.138 5.71v7.91h-.937v-1.318H1.626v1.318H.908v-7.91C.908 2.34 2.202.908 3.018.908h8.965c-.673.71-1.202 2.337-1.202 5.274zm2.577 6.458v-.634l.498-.234v.868h-.498z"
				fill="#000"
				fillOpacity={0.3}
			/>
		</svg>
	);
}

const MemoEmojiMail = React.memo(EmojiMail);
export default MemoEmojiMail;
