import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  allowedRoles,
  currentRole = "admin",
}) {
  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
