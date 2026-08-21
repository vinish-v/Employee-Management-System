import React, { useState, useEffect } from "react";
import "./AdminAttendance.css";
import { getAdminAttendance, handleAttendanceCorrection } from "../../services/adminService.js";
import ReviewCorrectionModal from "../../components/ReviewCorrectionModal.jsx";

const AdminAttendance = () => {
    const [records, setRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const fetchAttendance = async () => {
        try {
            setLoading(true);
            const res = await getAdminAttendance();
            if (res && res.records) {
                setRecords(res.records);
            }
        } catch (err) {
            console.error("Failed to load admin attendance records:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleOpenReview = (record) => {
        setSelectedRecord(record);
        setIsCorrectionModalOpen(true);
    };

    const handleCorrectionSubmit = async (data) => {
        try {
            const res = await handleAttendanceCorrection(data);
            setMsg(res.message || "Correction status updated successfully!");
            fetchAttendance();
            setTimeout(() => setMsg(""), 3000);
        } catch (err) {
            setMsg(err.response?.data?.message || "Failed to update correction");
            setTimeout(() => setMsg(""), 3000);
        }
    };

    const filteredRecords = records.filter((rec) => {
        const empName = rec.userId?.name || "";
        const empEmail = rec.userId?.email || "";
        const matchesSearch =
            empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = !selectedDate || rec.date === selectedDate;
        return matchesSearch && matchesDate;
    });

    return (
        <div className="admin-attendance-page">
            <div className="admin-attendance-header">
                <h1>Organization Attendance Logs</h1>
                <p className="subtitle">Monitor daily employee check-ins, check-outs, and correction requests</p>
            </div>

            {msg && <div style={{ color: "#ff5e00", fontWeight: "600", marginBottom: "15px" }}>{msg}</div>}

            <div className="filter-controls-row">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by employee name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="date-filter">
                    <label style={{ fontSize: "0.9rem", fontWeight: "500", marginRight: "8px" }}>Filter Date:</label>
                    <input
                        type="date"
                        className="date-input"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    {selectedDate && (
                        <button className="clear-date-btn" onClick={() => setSelectedDate("")}>
                            Clear
                        </button>
                    )}
                </div>
            </div>

            <div className="records-section">
                <h2>Attendance Logs ({filteredRecords.length})</h2>
                {loading ? (
                    <p>Loading attendance history...</p>
                ) : filteredRecords.length === 0 ? (
                    <p>No attendance records found matching criteria.</p>
                ) : (
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Date</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Working Hours</th>
                                <th>Status</th>
                                <th>Correction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((rec) => (
                                <tr key={rec._id}>
                                    <td>
                                        <strong>{rec.userId?.name || "Employee"}</strong>
                                        <br />
                                        <small style={{ color: "#777" }}>{rec.userId?.email}</small>
                                    </td>
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
                                        {rec.correctionRequested ? (
                                            <button className="correction-btn" onClick={() => handleOpenReview(rec)}>
                                                Review Request
                                            </button>
                                        ) : (
                                            <span style={{ color: "#aaa", fontSize: "0.85rem" }}>None</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <ReviewCorrectionModal
                isOpen={isCorrectionModalOpen}
                onClose={() => setIsCorrectionModalOpen(false)}
                record={selectedRecord}
                onSubmit={handleCorrectionSubmit}
            />
        </div>
    );
};

export default AdminAttendance;
