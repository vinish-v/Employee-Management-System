import React, { useState } from "react";
import "./AttendanceCorrectionModal.css";

const AttendanceCorrectionModal = ({ isOpen, onClose, record, onSubmit }) => {
    const [reason, setReason] = useState("");

    if (!isOpen || !record) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ recordId: record._id, reason });
        setReason("");
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Attendance Correction</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Date</label>
                            <input type="text" value={record.date} disabled />
                        </div>
                        <div className="form-group">
                            <label>Check-In / Check-Out</label>
                            <input type="text" value={`${record.checkIn || 'N/A'} - ${record.checkOut || 'N/A'}`} disabled />
                        </div>
                        <div className="form-group">
                            <label>Reason for Correction</label>
                            <textarea
                                rows="3"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Explain why attendance details need correction..."
                                required
                            />
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

export default AttendanceCorrectionModal;
