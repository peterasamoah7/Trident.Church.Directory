import * as React from "react";

const SvgGreenTick = (props) => (
  <svg
    width={11}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.5.083a5.417 5.417 0 1 0 0 10.833A5.417 5.417 0 0 0 5.5.083ZM4.417 8.208 1.708 5.5l.767-.766 1.942 1.941 4.108-4.108.767.766-4.875 4.875Z"
      fill="#00C853"
    />
  </svg>
);

export default SvgGreenTick;
