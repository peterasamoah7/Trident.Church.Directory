import * as React from "react";

const SvgVioletPersonBg = (props) => (
  <svg
    width={35}
    height={35}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={35} height={35} rx={5} fill="#7784EE" />
    <path
      d="M9.5 27S8 27 8 25.5s1.5-6 9-6 9 4.5 9 6-1.5 1.5-1.5 1.5h-15Zm7.5-9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
      fill="#fff"
    />
  </svg>
);

export default SvgVioletPersonBg;
