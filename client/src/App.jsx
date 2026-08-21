import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./Pages/Public/AuthLayout.jsx";
import AuthForm from "./Pages/Public/AuthForm.jsx";
import Dashboard from "./Pages/Client/Dashboard.jsx";
import SideBarLayout from "./Pages/Client/SideBarLayout.jsx";
import Profile from "./Pages/Client/Profile.jsx";
import Attendance from "./Pages/Client/Attendance.jsx";
import Leave from "./Pages/Client/Leave.jsx";
import Settings from "./Pages/Client/Settings.jsx";

// Admin Imports
import AdminSideBarLayout from "./Pages/Admin/AdminSideBarLayout.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import EmployeeManagement from "./Pages/Admin/EmployeeManagement.jsx";
import AdminLeave from "./Pages/Admin/AdminLeave.jsx";
import AdminAttendance from "./Pages/Admin/AdminAttendance.jsx";
import AdminSettings from "./Pages/Admin/AdminSettings.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<AuthForm type="signup" />} />
          <Route path="/signUp" element={<AuthForm type="signup" />} />
          <Route path="/login" element={<AuthForm type="login" />} />
        </Route>

        {/* Client Routes */}
        <Route element={<SideBarLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminSideBarLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<EmployeeManagement />} />
          <Route path="/admin/leaves" element={<AdminLeave />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;