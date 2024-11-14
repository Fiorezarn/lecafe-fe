import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (isAuthenticated && user?.data?.us_role === "ADMIN") {
    return <Navigate to="/dashboard" />;
  }
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PublicRoute;
