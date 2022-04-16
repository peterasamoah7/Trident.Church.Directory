import * as React from "react";

const SvgGreenPlus = (props) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 0a9.11 9.11 0 0 0-9 9 9.11 9.11 0 0 0 9 9 9.11 9.11 0 0 0 9-9 9.11 9.11 0 0 0-9-9Zm5.143 9.643h-4.5v4.5H8.357v-4.5h-4.5V8.357h4.5v-4.5h1.286v4.5h4.5v1.286Z"
      fill={props.fill ?? "#5DC983"}
    />
  </svg>
);

export default SvgGreenPlus;
