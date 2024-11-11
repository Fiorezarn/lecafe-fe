import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import SendEmail from "./pages/SendEmail";
import ForgotPassword from "./pages/ForgotPassword";
import Order from "./pages/Order";
import DashboardMenu from "./pages/DashboardMenu";
import DashboardUser from "./pages/DashboardUser";
import { ProtectedRoute, ProtectedRole } from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Cart from "./pages/Cart";
import DetailMenu from "./pages/DetailMenu";
import Unauthorized from "./pages/Unauthorized";
import VerifyFailed from "./pages/VerifyFailed";
import VerifySuccess from "./pages/VerifySucess";
import Dashboard from "./pages/Dashboard";
import DashboardTracking from "./pages/DashboardTracking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/:id" element={<DetailMenu />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/verify-success" element={<VerifySuccess />} />
      <Route path="/verify-failed" element={<VerifyFailed />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route element={<ProtectedRole />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/menu" element={<DashboardMenu />} />
          <Route path="/dashboard/tracking" element={<DashboardTracking />} />
          <Route path="/dashboard/user" element={<DashboardUser />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="order" element={<Order />} />
      </Route>
    </Routes>
  );
}

export default App;
