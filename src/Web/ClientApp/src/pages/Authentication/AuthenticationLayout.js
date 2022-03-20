import React from "react";

const AuthenticationLayout = (props) => {
  return (
    <main className="container-fluid row justify-content-center align-items-center">
      <div className="main-container container-md col-7 row p-0 shadow-sm">
        {props.children}
      </div>
    </main>
  );
};

export default AuthenticationLayout;
