import React, { useState, useEffect } from "react";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../../components/ChangePasswordModal.jsx";
import { getSettings, updateSettings, changePassword } from "../../services/settingsService.js";

const Settings = () => {
    const navigate = useNavigate();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [msg, setMsg] = useState("");

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        const fetchUserSettings = async () => {
            if (!user || !user.id) return;
            try {
                const res = await getSettings(user.id);
                if (res && res.settings) {
                    setEmailNotifications(res.settings.emailNotifications ?? true);
                    setSmsNotifications(res.settings.smsNotifications ?? false);
                    setTwoFactorAuth(res.settings.twoFactorAuth ?? false);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserSettings();
    }, []);

    const handleToggle = async (field, value, setter) => {
        setter(value);
        if (!user || !user.id) return;
        try {
            await updateSettings(user.id, { [field]: value });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChangePasswordSubmit = async ({ oldPassword, newPassword }) => {
        if (!user || !user.id) return;
        try {
            const res = await changePassword({ userId: user.id, oldPassword, newPassword });
            setMsg(res.message || "Password changed successfully");
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
        <div className="settings-page">
            <h1>Account Settings</h1>
            <p className="subtitle">Manage your profile options and application preferences</p>

            {msg && <div style={{ color: "#ff5e00", fontWeight: "500", marginBottom: "15px" }}>{msg}</div>}

            <div className="settings-container">
                <div className="settings-section">
                    <h2>Notifications</h2>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Email Alerts</h4>
                            <p>Receive updates and leave status notifications by email</p>
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
                            <h4>SMS Alerts</h4>
                            <p>Get instant text messages for urgent company alerts</p>
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
                    <h2>Security</h2>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Password</h4>
                            <p>Regularly update your password to keep your account safe</p>
                        </div>
                        <button className="btn-secondary" onClick={() => setIsPasswordModalOpen(true)}>
                            Change Password
                        </button>
                    </div>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Two-Factor Authentication</h4>
                            <p>Add an extra layer of security to your employee account</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={twoFactorAuth}
                                onChange={(e) => handleToggle("twoFactorAuth", e.target.checked, setTwoFactorAuth)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>Session</h2>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Log Out</h4>
                            <p>Safely exit your current session</p>
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

export default Settings;
