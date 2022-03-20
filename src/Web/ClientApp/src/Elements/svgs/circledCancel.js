import React from "react";

function CircledCancel(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 50 50" fill="none" {...props}>
      <circle cx={25} cy={25} r={24.5} stroke="#1665D8" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.515 31.688a1.788 1.788 0 102.53 2.53l6.322-6.323 6.322 6.323a1.788 1.788 0 102.53-2.53l-6.323-6.322 6.322-6.322a1.788 1.788 0 00-2.53-2.529l-6.321 6.322-6.322-6.322a1.788 1.788 0 00-2.529 2.53l6.322 6.321-6.323 6.322z"
        fill="#1665D8"
      />
    </svg>
  );
}

export default CircledCancel;
