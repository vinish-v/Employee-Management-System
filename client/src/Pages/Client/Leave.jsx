import React, { useState, useEffect } from "react";
import "./Leave.css";
import LeaveModal from "../../components/LeaveModal.jsx";
import { applyLeave, getUserLeaves, cancelLeave } from "../../services/leaveService.js";

const Leave = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const fetchLeaves = async () => {
        if (!user || !user.id) return;
        try {
            setLoading(true);
            const res = await getUserLeaves(user.id);
            if (res && res.leaves) {
                setLeaves(res.leaves);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleApplyLeave = async (leaveData) => {
        if (!user || !user.id) return;
        try {
            await applyLeave({ ...leaveData, userId: user.id });
            fetchLeaves();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancelLeave = async (leaveId) => {
        if (!user || !user.id) return;
        try {
            await cancelLeave(leaveId, user.id);
            fetchLeaves();
        } catch (err) {
            console.error(err);
        }
    };

    const pendingCount = leaves.filter(l => l.status === "Pending").length;
    const approvedCount = leaves.filter(l => l.status === "Approved").length;

    return (
        <div className="leave-page">
            <div className="leave-header">
                <h1>Leave Management</h1>
                <button className="apply-leave-btn" onClick={() => setIsModalOpen(true)}>
                    + Apply Leave
                </button>
            </div>

            <div className="leave-stats">
                <div className="stat-card">
                    <h3>Leave Remaining</h3>
                    <p>{user ? (user.leaveRemaining ?? 12) : 12}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Applications</h3>
                    <p>{pendingCount}</p>
                </div>
                <div className="stat-card">
                    <h3>Approved Leaves</h3>
                    <p>{approvedCount}</p>
                </div>
            </div>

            <div className="leave-history-section">
                <h2>Leave Requests History</h2>
                {loading ? (
                    <p>Loading leaves...</p>
                ) : leaves.length === 0 ? (
                    <p>No leave requests found.</p>
                ) : (
                    <table className="leave-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((leave) => (
                                <tr key={leave._id}>
                                    <td>{leave.leaveType}</td>
                                    <td>{leave.startDate}</td>
                                    <td>{leave.endDate}</td>
                                    <td>{leave.reason}</td>
                                    <td>
                                        <span className={`status-badge ${leave.status}`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td>
                                        {leave.status === "Pending" && (
                                            <button className="action-btn" onClick={() => handleCancelLeave(leave._id)}>
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <LeaveModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleApplyLeave}
            />
        </div>
    );
};

export default Leave;