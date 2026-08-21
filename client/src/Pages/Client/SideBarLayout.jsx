import { Outlet, NavLink } from "react-router-dom";
import "./SideBarLayout.css";

function SideBarLayout() {
    return (
        <div className="client-layout">
            <div className="layout-body">
                {/* Side Navigation Bar */}
                <aside className="sidebar">
                    {/* NavLink automatically adds an "active" class to the current page! */}
                    <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
                    <NavLink to="/profile" className="nav-item">My Profile</NavLink>
                    <NavLink to="/attendance" className="nav-item">Attendance</NavLink>
                    <NavLink to="/leave" className="nav-item">Leave</NavLink>
                    <NavLink to="/settings" className="nav-item">Settings</NavLink>
                </aside>

                {/* Main Content Area */}
                <main className="content-area">
                    {/* This is where the actual page (Dashboard, Profile, etc.) gets injected! */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default SideBarLayout;
