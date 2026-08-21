import React, { useState } from "react";
import "./ChangePasswordModal.css";

const ChangePasswordModal = ({ isOpen, onClose, onSubmit }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match!");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        onSubmit({ oldPassword, newPassword });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Change Password</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {error && <p className="error-message">{error}</p>}
                        <div className="form-group">
                            <label>Current Password</label>
                            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="cancel-modal-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="submit-btn">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
