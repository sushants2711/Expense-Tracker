import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
    const userEmail = localStorage.getItem("email");

    if(userEmail) {
        return <Navigate to = "/home" replace />
    }
    return children;
}