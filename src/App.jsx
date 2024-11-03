import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import SendEmail from "./pages/SendEmail";
import ForgotPassword from "./pages/ForgotPassword";
import Order from "./pages/Order";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";

function App() {
  // const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch({ type: "auth/getCookie" });
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log(isAuthenticated);
  //   }
  // }, [isAuthenticated]);

  // const PublicRoute = () => {
  //   const { isAuthenticated } = useSelector((state) => state.auth);

  //   if (isAuthenticated) {
  //     return <Navigate to="/" />;
  //   }
  //   return <Outlet />;
  // };

  // const ProtectedRoute = () => {
  //   const { isAuthenticated } = useSelector((state) => state.auth);
  //   const location = useLocation();
  //   console.log(isAuthenticated);

  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" state={{ from: location }} replace />;
  //   }
  //   return <Outlet />;
  // };

  // const routes = [
  //   {
  //     element: <PublicRoute />,
  //     children: [
  //       { path: "/login", element: <Login /> },
  //       { path: "/register", element: <Register /> },
  //       { path: "/send-email", element: <SendEmail /> },
  //       { path: "/forgot-password", element: <ForgotPassword /> },
  //     ],
  //   },
  //   { path: "/menu", element: <Menu /> },
  //   { path: "/", element: <Home /> },
  //   { path: "/order", element: <Order /> },
  //   { path: "/dashboard", element: <Dashboard /> },
  //   {
  //     path: "/order",
  //     element: <ProtectedRoute />,
  //     children: [{ path: "/order", element: <Order /> }],
  //   },
  // ];

  return (
    // <Routes>
    //   {routes.map((route, index) => (
    //     <Route key={index} path={route.path} element={route.element}>
    //       {route.children?.map((child, childIndex) => (
    //         <Route
    //           key={childIndex}
    //           index={child.index}
    //           path={child.path}
    //           element={child.element}
    //         />
    //       ))}
    //     </Route>
    //   ))}
    // </Routes>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="order" element={<Order />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
