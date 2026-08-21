import React, { useState, useEffect } from "react";
import "./ReviewCorrectionModal.css";

const ReviewCorrectionModal = ({ isOpen, onClose, record, onSubmit }) => {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    useEffect(() => {
        if (record) {
            setCheckIn(record.checkIn || "09:00 AM");
            setCheckOut(record.checkOut || "05:00 PM");
        }
    }, [record]);

    if (!isOpen || !record) return null;

    const handleAction = (action) => {
        onSubmit({
            recordId: record._id,
            action,
            checkIn: action === "Approve" ? checkIn : undefined,
            checkOut: action === "Approve" ? checkOut : undefined
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content review-correction-modal">
                <div className="modal-header">
                    <h2>Attendance Correction Request</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="request-detail">
                        <p><strong>Employee:</strong> {record.userId?.name || "Employee"} ({record.userId?.email})</p>
                        <p><strong>Date:</strong> {record.date}</p>
                        <p><strong>Current Check-In:</strong> {record.checkIn || "--:--"}</p>
                        <p><strong>Current Check-Out:</strong> {record.checkOut || "--:--"}</p>
                        <p className="reason-box"><strong>Reason for Request:</strong> "{record.correctionReason}"</p>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Updated Check-In Time</label>
                            <input
                                type="text"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                placeholder="09:00 AM"
                            />
                        </div>
                        <div className="form-group">
                            <label>Updated Check-Out Time</label>
                            <input
                                type="text"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                placeholder="05:00 PM"
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="cancel-modal-btn" onClick={onClose}>Cancel</button>
                    <button type="button" className="reject-modal-btn" onClick={() => handleAction("Reject")}>
                        Reject
                    </button>
                    <button type="button" className="submit-btn" onClick={() => handleAction("Approve")}>
                        Approve & Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewCorrectionModal;
