import React, { useState, useEffect } from "react";
import "./Attendance.css";
import AttendanceCorrectionModal from "../../components/AttendanceCorrectionModal.jsx";
import { getAttendanceSummary, getAttendanceRecords, checkInUser, checkOutUser, requestAttendanceCorrection } from "../../services/attendanceService.js";

const Attendance = () => {
    const [summary, setSummary] = useState(null);
    const [records, setRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [actionMsg, setActionMsg] = useState("");

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const userId = user?.id || user?._id;

    const fetchData = async () => {
        if (!userId) return;
        try {
            setLoading(true);
            const sumRes = await getAttendanceSummary(userId);
            if (sumRes && sumRes.summary) {
                setSummary(sumRes.summary);
            }
            const recRes = await getAttendanceRecords(userId);
            if (recRes && recRes.records) {
                setRecords(recRes.records);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCheckIn = async () => {
        if (!userId) {
            setActionMsg("User not logged in. Please log in first.");
            return;
        }
        try {
            const res = await checkInUser(userId);
            setActionMsg(res.message || "Checked in!");
            fetchData();
            setTimeout(() => setActionMsg(""), 3000);
        } catch (err) {
            setActionMsg(err.response?.data?.message || "Check-in failed");
            setTimeout(() => setActionMsg(""), 4000);
        }
    };

    const handleCheckOut = async () => {
        if (!userId) {
            setActionMsg("User not logged in. Please log in first.");
            return;
        }
        try {
            const res = await checkOutUser(userId);
            setActionMsg(res.message || "Checked out!");
            fetchData();
            setTimeout(() => setActionMsg(""), 3000);
        } catch (err) {
            setActionMsg(err.response?.data?.message || "Check-out failed");
            setTimeout(() => setActionMsg(""), 4000);
        }
    };

    const handleOpenCorrection = (record) => {
        setSelectedRecord(record);
        setIsCorrectionModalOpen(true);
    };

    const handleCorrectionSubmit = async ({ recordId, reason }) => {
        if (!userId) return;
        try {
            const res = await requestAttendanceCorrection({ userId, recordId, reason });
            setActionMsg(res.message || "Correction submitted!");
            fetchData();
            setTimeout(() => setActionMsg(""), 3000);
        } catch (err) {
            setActionMsg(err.response?.data?.message || "Correction failed");
            setTimeout(() => setActionMsg(""), 4000);
        }
    };

    const todayDateStr = new Date().toISOString().split("T")[0];
    const todayRecord = records.find(r => r.date === todayDateStr);

    return (
        <div className="attendance-page">
            <h1>Attendance Management</h1>

            {actionMsg && <div style={{ color: "#ff5e00", fontWeight: "600", marginBottom: "15px" }}>{actionMsg}</div>}

            <div className="action-card">
                <div className="status-info">
                    <h2>Daily Attendance Tracker</h2>
                    <p>
                        {todayRecord && todayRecord.checkIn
                            ? `Checked in at ${todayRecord.checkIn} ${todayRecord.checkOut ? ` | Checked out at ${todayRecord.checkOut}` : ''}`
                            : 'You have not checked in today yet.'}
                    </p>
                </div>
                <div className="btn-group">
                    <button className="checkin-btn" onClick={handleCheckIn}>Check In</button>
                    <button className="checkout-btn" onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="attendance-stat-box">
                    <h3>Overall Attendance</h3>
                    <p>{summary ? `${summary.attendance}%` : "100%"}</p>
                </div>
                <div className="attendance-stat-box">
                    <h3>Present Days</h3>
                    <p>{summary ? summary.presentDays : "0"}</p>
                </div>
                <div className="attendance-stat-box">
                    <h3>Leave Remaining</h3>
                    <p>{summary ? summary.leaveRemaining : "12"}</p>
                </div>
                <div className="attendance-stat-box">
                    <h3>Pending Requests</h3>
                    <p>{summary ? summary.pendingRequests : "0"}</p>
                </div>
            </div>

            <div className="records-section">
                <h2>Attendance Logs</h2>
                {loading ? (
                    <p>Loading attendance history...</p>
                ) : records.length === 0 ? (
                    <p>No attendance records logged yet.</p>
                ) : (
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Working Hours</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((rec) => (
                                <tr key={rec._id}>
                                    <td>{rec.date}</td>
                                    <td>{rec.checkIn || "--:--"}</td>
                                    <td>{rec.checkOut || "--:--"}</td>
                                    <td>{rec.workingHours || "0 hrs"}</td>
                                    <td>
                                        <span className={`status-badge ${rec.status}`}>
                                            {rec.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="correction-btn" onClick={() => handleOpenCorrection(rec)}>
                                            {rec.correctionRequested ? "Requested" : "Request Correction"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <AttendanceCorrectionModal
                isOpen={isCorrectionModalOpen}
                onClose={() => setIsCorrectionModalOpen(false)}
                record={selectedRecord}
                onSubmit={handleCorrectionSubmit}
            />
        </div>
    );
};

export default Attendance;