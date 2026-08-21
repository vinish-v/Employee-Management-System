import React, { useState, useEffect } from "react";
import "./AdminSettings.css";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../../components/ChangePasswordModal.jsx";
import { getSettings, updateSettings, changePassword } from "../../services/settingsService.js";

const AdminSettings = () => {
    const navigate = useNavigate();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(true);
    const [systemAuditLogs, setSystemAuditLogs] = useState(true);
    const [msg, setMsg] = useState("");

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        const fetchSettings = async () => {
            if (!user || (!user.id && !user._id)) return;
            const userId = user.id || user._id;
            try {
                const res = await getSettings(userId);
                if (res && res.settings) {
                    setEmailNotifications(res.settings.emailNotifications ?? true);
                    setSmsNotifications(res.settings.smsNotifications ?? true);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchSettings();
    }, []);

    const handleToggle = async (field, value, setter) => {
        setter(value);
        if (!user || (!user.id && !user._id)) return;
        const userId = user.id || user._id;
        try {
            await updateSettings(userId, { [field]: value });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangePasswordSubmit = async ({ oldPassword, newPassword }) => {
        if (!user || (!user.id && !user._id)) return;
        const userId = user.id || user._id;
        try {
            const res = await changePassword({ userId, oldPassword, newPassword });
            setMsg(res.message || "Admin password changed successfully");
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg(err.response?.data?.message || "Failed to change password");
            setTimeout(() => setMsg(""), 3000);
        }
    };

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="settings-page admin-settings-page">
            <h1>Admin System Settings</h1>
            <p className="subtitle">Configure portal preferences, security policies, and administrator credentials</p>

            {msg && <div style={{ color: "#ff5e00", fontWeight: "500", marginBottom: "15px" }}>{msg}</div>}

            <div className="settings-container">
                <div className="settings-section">
                    <h2>Admin Notifications</h2>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Leave & Attendance Emails</h4>
                            <p>Receive email notifications when employees apply for leave or request attendance corrections</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={emailNotifications}
                                onChange={(e) => handleToggle("emailNotifications", e.target.checked, setEmailNotifications)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Urgent SMS Alerts</h4>
                            <p>Get SMS notifications for critical administrative alerts</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={smsNotifications}
                                onChange={(e) => handleToggle("smsNotifications", e.target.checked, setSmsNotifications)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>Security & Audit</h2>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Admin Password</h4>
                            <p>Regularly update your admin account security credentials</p>
                        </div>
                        <button className="btn-secondary" onClick={() => setIsPasswordModalOpen(true)}>
                            Change Password
                        </button>
                    </div>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>System Audit Logging</h4>
                            <p>Log all administrative status changes and updates</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={systemAuditLogs}
                                onChange={(e) => setSystemAuditLogs(e.target.checked)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>Admin Session</h2>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Log Out</h4>
                            <p>Safely terminate current admin session</p>
                        </div>
                        <button className="logout-btn" onClick={handleLogOut}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSubmit={handleChangePasswordSubmit}
            />
        </div>
    );
};

export default AdminSettings;
