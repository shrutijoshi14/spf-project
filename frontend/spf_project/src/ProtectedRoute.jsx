// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // If not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children; // otherwise show the protected page
};

export default ProtectedRoute;
