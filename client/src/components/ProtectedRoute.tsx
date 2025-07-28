import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <h1>Chargement...</h1>;
  }
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
