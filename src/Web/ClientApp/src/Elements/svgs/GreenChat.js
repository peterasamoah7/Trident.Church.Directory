import * as React from "react";

const SvgGreenChat = (props) => (
  <svg
    width={props.size || 18}
    height={props.size || 18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={9} cy={9} r={9} fill="#5DC983" />
    <path
      d="M5.25 12.964V6.107c0-.473.384-.857.857-.857h6c.474 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H7.821a.853.853 0 0 0-.514.171L5.25 12.964Zm.857-6.857v5.143l.915-.686a.85.85 0 0 1 .514-.171h4.571V6.107h-6Z"
      fill="#fff"
    />
    <path d="M5.679 5.679h6.857v5.143H6.822l-1.143 1.142V5.68Z" fill="#fff" />
  </svg>
);

export default SvgGreenChat;

export const GreenChat2 = (props) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    {...props}
  >
    <circle cx={9} cy={9} r={9} fill="#5DC983" />
    <path
      d="M5.25 12.964V6.107c0-.473.384-.857.857-.857h6c.474 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H7.821a.853.853 0 0 0-.514.171L5.25 12.964Zm.857-6.857v5.143l.915-.686a.85.85 0 0 1 .514-.171h4.571V6.107h-6Z"
      fill="#fff"
    />
    <path d="M5.679 5.679h6.857v5.143H6.822l-1.143 1.142V5.68Z" fill="#fff" />
  </svg>
);
