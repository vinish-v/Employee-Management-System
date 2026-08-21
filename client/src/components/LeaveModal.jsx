import React, { useState } from "react";
import "./LeaveModal.css";

const LeaveModal = ({ isOpen, onClose, onSubmit }) => {
    const [leaveType, setLeaveType] = useState("Casual Leave");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ leaveType, startDate, endDate, reason });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Apply for Leave</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Leave Type</label>
                            <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Earned Leave">Earned Leave</option>
                                <option value="Emergency Leave">Emergency Leave</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Reason</label>
                            <textarea rows="3" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for leave..." required />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="cancel-modal-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="submit-btn">Submit Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeaveModal;
