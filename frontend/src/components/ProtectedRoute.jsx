import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {

  const { isAuthenticated } = useContext(AuthContext);

  // Redirect user if not authenticated
  if (!isAuthenticated) {

    return <Navigate to="/" />;

  }

  return children;
}