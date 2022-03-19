import * as React from "react";

const SvgBlueTick = (props) => (
  <svg
    width={81}
    height={84}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m40.042 2 10.506 7.664 13.006-.024 3.994 12.376 10.536 7.624L74.042 42l4.042 12.36-10.536 7.624-3.994 12.376-13.006-.024L40.042 82l-10.506-7.664-13.006.024-3.994-12.376L2 54.36 6.042 42 2 29.64l10.536-7.624L16.53 9.64l13.006.024L40.042 2Z"
      fill="#1665D8"
      stroke="#1665D8"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m26.042 42 10 10 20-20"
      stroke="#fff"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgBlueTick;
