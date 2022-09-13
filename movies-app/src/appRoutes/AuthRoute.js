import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

export default function AuthRoute({ children }) {
  const location = useLocation();
  const [isAuthenticated, _handleAuthChange] = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
