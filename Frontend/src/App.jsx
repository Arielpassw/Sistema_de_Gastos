import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import DashboardUser from "./pages/Dashboard/DashboardUser";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import UpdatePassword from "./pages/Auth/UpdatePassword";
import Landing from "./pages/Landing/Landing";
import DashboardAdmin from "./pages/Dashboard/DashboardAdmin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<Home />} />
        
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboardUser"
          element={
            <ProtectedRoute>
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-test"
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        
        <Route
          path="/update-password"
          element={<UpdatePassword />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;