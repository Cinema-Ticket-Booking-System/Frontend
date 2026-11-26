import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function ProtectedRoute({ allowedRoles, currentRole }) {
  const { role } = useAuth();
  const location = useLocation();
  const activeRole = currentRole ?? role;

  if (allowedRoles && (!activeRole || !allowedRoles.includes(activeRole))) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
