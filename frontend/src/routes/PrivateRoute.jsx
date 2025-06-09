import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {

  const userEmail = localStorage.getItem("email");

  if (!userEmail) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
