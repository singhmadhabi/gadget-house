import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/login";

export const PrivateRoute = ({ children, role }) => {
  return <>{isLoggedIn(role) ? children : <Navigate to="/login" />}</>;
};