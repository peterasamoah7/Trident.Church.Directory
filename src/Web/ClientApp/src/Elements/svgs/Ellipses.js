import * as React from "react";

function Ellipses(props) {
  return (
    <svg width="1em" height="1em" fill="none" viewBox="0 0 32 32" {...props}>
      <path
        d="M8 18a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z"
        fill="currentColor"
      />
    </svg>
  );
}

export default Ellipses;
