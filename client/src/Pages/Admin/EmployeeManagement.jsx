import React, { useState, useEffect } from "react";
import "./EmployeeManagement.css";
import AddEditEmployeeModal from "../../components/AddEditEmployeeModal.jsx";
import { getAdminEmployees, addEmployee, updateEmployee, deleteEmployee } from "../../services/adminService.js";

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const res = await getAdminEmployees();
            if (res && res.employees) {
                setEmployees(res.employees);
            }
        } catch (err) {
            console.error("Failed to load employees:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleOpenAddModal = () => {
        setSelectedEmployee(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (emp) => {
        setSelectedEmployee(emp);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (formData) => {
        try {
            if (selectedEmployee) {
                const res = await updateEmployee(selectedEmployee._id, formData);
                setMsg(res.message || "Employee updated successfully!");
            } else {
                const res = await addEmployee(formData);
                setMsg(res.message || "Employee added successfully!");
            }
            fetchEmployees();
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg(err.response?.data?.message || "Operation failed");
            setTimeout(() => setMsg(""), 4000);
        }
    };

    const handleDeleteEmployee = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete employee "${name}"?`)) {
            try {
                const res = await deleteEmployee(id);
                setMsg(res.message || "Employee deleted successfully!");
                fetchEmployees();
                setTimeout(() => setMsg(""), 3000);
            } catch (err) {
                setMsg(err.response?.data?.message || "Failed to delete employee");
                setTimeout(() => setMsg(""), 4000);
            }
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="employee-page">
            <div className="employee-header">
                <div>
                    <h1>Employee Directory</h1>
                    <p className="subtitle">Manage all user accounts, roles, and department assignments</p>
                </div>
                <button className="apply-leave-btn" onClick={handleOpenAddModal}>
                    + Add New Employee
                </button>
            </div>

            {msg && <div style={{ color: "#ff5e00", fontWeight: "600", marginBottom: "15px" }}>{msg}</div>}

            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search employee by name, email, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="records-section">
                <h2>All Employees ({filteredEmployees.length})</h2>
                {loading ? (
                    <p>Loading employee directory...</p>
                ) : filteredEmployees.length === 0 ? (
                    <p>No employees found matching your query.</p>
                ) : (
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((emp) => (
                                <tr key={emp._id}>
                                    <td><strong>{emp.name}</strong></td>
                                    <td>{emp.email}</td>
                                    <td>
                                        <span className={`role-badge ${emp.role}`}>
                                            {emp.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>{emp.department || "General"}</td>
                                    <td>{emp.designation || "Employee"}</td>
                                    <td>{emp.phone || "--"}</td>
                                    <td>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <button className="edit-btn-sm" onClick={() => handleOpenEditModal(emp)}>
                                                Edit
                                            </button>
                                            <button className="delete-btn-sm" onClick={() => handleDeleteEmployee(emp._id, emp.name)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <AddEditEmployeeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                employee={selectedEmployee}
                onSubmit={handleModalSubmit}
            />
        </div>
    );
};

export default EmployeeManagement;
