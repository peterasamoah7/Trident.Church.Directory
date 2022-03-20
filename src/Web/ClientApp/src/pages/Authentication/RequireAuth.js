import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthCookie } from "../../services/auth";

const RequireAuth = ({ children, redirectTo }) => {
  var user = getAuthCookie();
  var location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
};

export default RequireAuth;
