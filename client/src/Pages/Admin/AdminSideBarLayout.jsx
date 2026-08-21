import { Outlet, NavLink } from "react-router-dom";
import "./AdminSideBarLayout.css";

function AdminSideBarLayout() {
    return (
        <div className="client-layout">
            <div className="layout-body">
                {/* Admin Side Navigation Bar */}
                <aside className="sidebar admin-sidebar">
                    <div className="admin-badge">ADMIN PORTAL</div>
                    <NavLink to="/admin/dashboard" className="nav-item">Dashboard</NavLink>
                    <NavLink to="/admin/employees" className="nav-item">Employees</NavLink>
                    <NavLink to="/admin/leaves" className="nav-item">Leave Requests</NavLink>
                    <NavLink to="/admin/attendance" className="nav-item">Attendance Logs</NavLink>
                    <NavLink to="/admin/settings" className="nav-item">Settings</NavLink>
                </aside>

                {/* Main Content Area */}
                <main className="content-area">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminSideBarLayout;
