import React, { useState, useEffect } from "react";
import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, onClose, userProfile, onSubmit }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (userProfile) {
            setName(userProfile.name || "");
            setPhone(userProfile.phone || "");
            setDepartment(userProfile.department || "");
            setDesignation(userProfile.designation || "");
            setAddress(userProfile.address || "");
        }
    }, [userProfile]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, phone, department, designation, address });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Profile</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-grid">
                        <div className="form-group full-width">
                            <label>Full Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Engineering" />
                        </div>
                        <div className="form-group full-width">
                            <label>Designation</label>
                            <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Software Engineer" />
                        </div>
                        <div className="form-group full-width">
                            <label>Address</label>
                            <textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="City, Country" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="cancel-modal-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="submit-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
