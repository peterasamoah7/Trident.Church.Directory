import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getAuthCookie } from "../../services/auth";

const AuthPagesGuard = ({ children }) => {
  var location = useLocation();
  //debugger;
  var user = getAuthCookie();

  let from = location.state?.from?.pathname || "/";

  return user ? (
    <Navigate to={from} state={{ from: location }} replace />
  ) : (
    children
  );
};

export default AuthPagesGuard;
