import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  // If NOT logged in, send to /login (NOT /)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}