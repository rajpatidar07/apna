import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";

const AuthWrapper = () => {
  const location = useLocation(); // current location

  const adminLogged = localStorage.getItem("token");

  return adminLogged ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }} // <-- pass location in route state
    />
  );
};

export default AuthWrapper;
