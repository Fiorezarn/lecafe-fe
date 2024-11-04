import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

const ProtectedRole = () => {
  const { cookie } = useSelector((state) => state.auth);
  const role = cookie?.us_role;

  if (role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export { ProtectedRoute, ProtectedRole };
