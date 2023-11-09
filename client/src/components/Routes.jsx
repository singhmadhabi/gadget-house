import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/login";

export const PrivateRoute = ({ children, role }) => {
  return (
    <>
      {isLoggedIn() && validRole(role) ? (
        children
      ) : isLoggedIn() && !validRole(role) ? (
        <Navigate replace to="/admin/dashboard" />
      ) : (
        <Navigate replace to="/login" />
      )}
    </>
  );
};