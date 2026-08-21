import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { getAdminStats, getAdminLeaves, getAdminAttendance, updateLeaveStatus, handleAttendanceCorrection } from "../../services/adminService.js";
import ReviewCorrectionModal from "../../components/ReviewCorrectionModal.jsx";

export default function AdminDashboard() {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const [stats, setStats] = useState({
        totalEmployees: 0,
        pendingLeaves: 0,
        pendingCorrections: 0,
        presentToday: 0
    });
    const [recentLeaves, setRecentLeaves] = useState([]);
    const [pendingCorrectionsList, setPendingCorrectionsList] = useState([]);
    const [selectedCorrection, setSelectedCorrection] = useState(null);
    const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");

    const fetchAdminDashboard = async () => {
        try {
            setLoading(true);
            const [statsRes, leavesRes, attendanceRes] = await Promise.allSettled([
                getAdminStats(),
                getAdminLeaves(),
                getAdminAttendance()
            ]);

            if (statsRes.status === "fulfilled" && statsRes.value?.stats) {
                setStats(statsRes.value.stats);
            }

            if (leavesRes.status === "fulfilled" && leavesRes.value?.leaves) {
                setRecentLeaves(leavesRes.value.leaves.slice(0, 5));
            }

            if (attendanceRes.status === "fulfilled" && attendanceRes.value?.records) {
                const pending = attendanceRes.value.records.filter(r => r.correctionRequested);
                setPendingCorrectionsList(pending.slice(0, 5));
            }
        } catch (err) {
            console.error("Error loading admin dashboard:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminDashboard();
    }, []);

    const handleQuickLeaveStatus = async (leaveId, status) => {
        try {
            const res = await updateLeaveStatus(leaveId, status);
            setMsg(res.message || `Leave ${status}`);
            fetchAdminDashboard();
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg(err.response?.data?.message || "Failed to update status");
            setTimeout(() => setMsg(""), 3000);
        }
    };

    const handleOpenCorrection = (record) => {
        setSelectedCorrection(record);
        setIsCorrectionModalOpen(true);
    };

    const handleCorrectionSubmit = async (data) => {
        try {
            const res = await handleAttendanceCorrection(data);
            setMsg(res.message || "Correction request updated");
            fetchAdminDashboard();
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg(err.response?.data?.message || "Action failed");
            setTimeout(() => setMsg(""), 3000);
        }
    };

    return (
        <div className="entire admin-dashboard-page">
            <h1 style={{ color: "#ff4800ff", fontFamily: 'Garmond', fontSize: "2.5rem", marginBottom: "2rem", fontWeight: "600" }}>
                Admin Control Center, {user ? user.name : "Admin"}
            </h1>

            {msg && <div style={{ color: "#ff5e00", fontWeight: "600", marginBottom: "15px" }}>{msg}</div>}

            <div className="boxes">
                <div className="box" id="box1">
                    <h2>Total Employees</h2>
                    <p>{loading ? "Loading..." : stats.totalEmployees}</p>
                </div>
                <div className="box" id="box2">
                    <h2>Present Today</h2>
                    <p>{loading ? "Loading..." : stats.presentToday}</p>
                </div>
                <div className="box" id="box3">
                    <h2>Pending Leaves</h2>
                    <p>{loading ? "Loading..." : stats.pendingLeaves}</p>
                </div>
                <div className="box" id="box4">
                    <h2>Attendance Alerts</h2>
                    <p>{loading ? "Loading..." : stats.pendingCorrections}</p>
                </div>
            </div>

            <div className="dashboard-sections-grid">
                {/* Recent Leave Requests */}
                <div className="records-section">
                    <h2>Recent Leave Applications</h2>
                    {loading ? (
                        <p>Loading leave applications...</p>
                    ) : recentLeaves.length === 0 ? (
                        <p>No recent leave applications found.</p>
                    ) : (
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Type</th>
                                    <th>Dates</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentLeaves.map((l) => (
                                    <tr key={l._id}>
                                        <td>{l.userId?.name || "Employee"}</td>
                                        <td>{l.leaveType}</td>
                                        <td>{l.startDate} - {l.endDate}</td>
                                        <td>
                                            <span className={`status-badge ${l.status}`}>
                                                {l.status}
                                            </span>
                                        </td>
                                        <td>
                                            {l.status === "Pending" ? (
                                                <div style={{ display: "flex", gap: "6px" }}>
                                                    <button
                                                        className="approve-btn-sm"
                                                        onClick={() => handleQuickLeaveStatus(l._id, "Approved")}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="reject-btn-sm"
                                                        onClick={() => handleQuickLeaveStatus(l._id, "Rejected")}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span style={{ fontSize: "0.85rem", color: "#888" }}>Done</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pending Attendance Correction Requests */}
                <div className="records-section">
                    <h2>Pending Attendance Corrections</h2>
                    {loading ? (
                        <p>Loading correction requests...</p>
                    ) : pendingCorrectionsList.length === 0 ? (
                        <p>No pending correction requests.</p>
                    ) : (
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Date</th>
                                    <th>Reason</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingCorrectionsList.map((rec) => (
                                    <tr key={rec._id}>
                                        <td>{rec.userId?.name || "Employee"}</td>
                                        <td>{rec.date}</td>
                                        <td>{rec.correctionReason || "Requested"}</td>
                                        <td>
                                            <button className="correction-btn" onClick={() => handleOpenCorrection(rec)}>
                                                Review Request
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <ReviewCorrectionModal
                isOpen={isCorrectionModalOpen}
                onClose={() => setIsCorrectionModalOpen(false)}
                record={selectedCorrection}
                onSubmit={handleCorrectionSubmit}
            />
        </div>
    );
}
