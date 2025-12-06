// src/components/RoleProtected.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";

export default function RoleProtected({ children, role }) {
  const { user, hasRole } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (!hasRole(role)) return <div className="alert alert-danger">No tienes permisos para ver esta página.</div>;
  return children;
}
