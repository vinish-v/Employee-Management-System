import React, { useState, useEffect } from "react";
import "./AdminLeave.css";
import { getAdminLeaves, updateLeaveStatus } from "../../services/adminService.js";

const AdminLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const fetchLeaves = async () => {
        try {
            setLoading(true);
            const res = await getAdminLeaves();
            if (res && res.leaves) {
                setLeaves(res.leaves);
            }
        } catch (err) {
            console.error("Failed to load admin leaves:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await updateLeaveStatus(id, status);
            setMsg(res.message || `Leave application ${status.toLowerCase()} successfully`);
            fetchLeaves();
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg(err.response?.data?.message || "Failed to update leave status");
            setTimeout(() => setMsg(""), 3000);
        }
    };

    const filteredLeaves = leaves.filter((leave) => {
        const matchesStatus = filterStatus === "All" || leave.status === filterStatus;
        const empName = leave.userId?.name || "";
        const empEmail = leave.userId?.email || "";
        const matchesSearch =
            empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="admin-leave-page">
            <div className="admin-leave-header">
                <h1>Leave Applications Management</h1>
                <p className="subtitle">Review and approve or reject employee leave requests</p>
            </div>

            {msg && <div style={{ color: "#ff5e00", fontWeight: "600", marginBottom: "15px" }}>{msg}</div>}

            <div className="filter-controls-row">
                <div className="tab-filters">
                    {["All", "Pending", "Approved", "Rejected"].map((st) => (
                        <button
                            key={st}
                            className={`filter-tab ${filterStatus === st ? "active" : ""}`}
                            onClick={() => setFilterStatus(st)}
                        >
                            {st}
                        </button>
                    ))}
                </div>

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by employee or leave type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="records-section">
                <h2>Leave Applications ({filteredLeaves.length})</h2>
                {loading ? (
                    <p>Loading leave applications...</p>
                ) : filteredLeaves.length === 0 ? (
                    <p>No leave applications found matching your criteria.</p>
                ) : (
                    <table className="leave-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Department</th>
                                <th>Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeaves.map((leave) => (
                                <tr key={leave._id}>
                                    <td>
                                        <strong>{leave.userId?.name || "Employee"}</strong>
                                        <br />
                                        <small style={{ color: "#777" }}>{leave.userId?.email}</small>
                                    </td>
                                    <td>{leave.userId?.department || "General"}</td>
                                    <td>{leave.leaveType}</td>
                                    <td>{leave.startDate}</td>
                                    <td>{leave.endDate}</td>
                                    <td style={{ maxWidth: "200px" }}>{leave.reason}</td>
                                    <td>
                                        <span className={`status-badge ${leave.status}`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: "flex", gap: "6px" }}>
                                            {leave.status !== "Approved" && (
                                                <button
                                                    className="approve-btn-sm"
                                                    onClick={() => handleStatusUpdate(leave._id, "Approved")}
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {leave.status !== "Rejected" && (
                                                <button
                                                    className="reject-btn-sm"
                                                    onClick={() => handleStatusUpdate(leave._id, "Rejected")}
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminLeave;
