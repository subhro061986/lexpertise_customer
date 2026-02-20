import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, openLoginModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // Open login modal directly — no prop drilling, no timing issues
      openLoginModal();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;