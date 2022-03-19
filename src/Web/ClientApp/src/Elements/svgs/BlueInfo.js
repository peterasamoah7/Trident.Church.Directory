import * as React from "react";

const SvgBlueInfo = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={12} cy={12} r={12} fill="#558FE3" fillOpacity={0.1} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-5.25-3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm-1.5 2.25a.75.75 0 1 0 0 1.5V15a.75.75 0 0 0 .75.75h.75a.75.75 0 1 0 0-1.5V12a.75.75 0 0 0-.75-.75h-.75Z"
      fill="#558FE3"
      fillOpacity={0.7}
    />
  </svg>
);

export default SvgBlueInfo;
