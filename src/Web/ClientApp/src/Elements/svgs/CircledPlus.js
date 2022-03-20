import * as React from "react";

const SvgCircledPlus = (props) => (
  <svg
    width={props.size || 22}
    height={props.size || 22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 22a11 11 0 1 1 0-22 11 11 0 0 1 0 22Zm0-20a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
      fill="currentColor"
    />
    <path d="M16 10h-4V6h-2v4H6v2h4v4h2v-4h4v-2Z" fill="currentColor" />
  </svg>
);

export default SvgCircledPlus;
