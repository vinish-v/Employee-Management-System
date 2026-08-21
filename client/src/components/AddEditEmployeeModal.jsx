import React, { useState, useEffect } from "react";
import "./AddEditEmployeeModal.css";

const AddEditEmployeeModal = ({ isOpen, onClose, employee, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "client",
        department: "General",
        designation: "Employee",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name || "",
                email: employee.email || "",
                password: "", // Password not filled for edit
                role: employee.role || "client",
                department: employee.department || "General",
                designation: employee.designation || "Employee",
                phone: employee.phone || "",
                address: employee.address || ""
            });
        } else {
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "client",
                department: "General",
                designation: "Employee",
                phone: "",
                address: ""
            });
        }
    }, [employee, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content admin-employee-modal">
                <div className="modal-header">
                    <h2>{employee ? "Edit Employee" : "Add New Employee"}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                        </div>

                        {!employee && (
                            <div className="form-group">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Set temporary password"
                                    required
                                />
                            </div>
                        )}

                        <div className="form-row">
                            <div className="form-group">
                                <label>Role</label>
                                <select name="role" value={formData.role} onChange={handleChange}>
                                    <option value="client">Employee / Client</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    placeholder="e.g. Engineering"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    placeholder="e.g. Software Engineer"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Address / Location</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="City / Office Location"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="cancel-modal-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="submit-btn">
                            {employee ? "Update Employee" : "Save Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditEmployeeModal;
