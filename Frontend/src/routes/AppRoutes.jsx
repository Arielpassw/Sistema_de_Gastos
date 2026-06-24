import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import DashboardAdmin from "../pages/Dashboard/DashboardAdmin";
import Profile from "../pages/Profile/Profile";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import Landing from "../pages/Landing/Landing";
import DashboardUser from "../pages/Dashboard/DashboardUser";

function AppRoutes() {

  return (
    <Routes>

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboardUser"
        element={<DashboardUser />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/update-password"
        element={<UpdatePassword />}
      />

      <Route
        path="/"
        element={<Landing />}
      />

      

      {/* 2. AÑADE ESTA RUTA TEMPORAL PARA PRUEBAS */}
      <Route path="/admin-test" element={<DashboardAdmin />} />
    </Routes >
  );
}

export default AppRoutes;
