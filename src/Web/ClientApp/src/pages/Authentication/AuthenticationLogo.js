import React from "react";
import SvgLogo from "../../Elements/svgs/Logo";

const AuthenticationLogo = (props) => {
  return (
    <>
      <figure className="d-inline-flex align-items-center">
        <SvgLogo />
        <figcaption>
          <h3 className="text-primary m-0 ms-2 p-0">{props.text}</h3>
        </figcaption>
      </figure>
    </>
  );
};

export default AuthenticationLogo;
