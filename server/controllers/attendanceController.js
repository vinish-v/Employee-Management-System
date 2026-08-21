//imports from its respective service
import { getAttendanceSummary, getAttendanceRecords, checkIn, checkOut, requestCorrection } from "../services/attendanceService.js";
//This acts as the bridge btw routes and services

const getSummaryHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const summary = await getAttendanceSummary(userId);
        return res.status(200).json({
            message: "Attendance summary fetched successfully",
            summary
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getRecordsHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const records = await getAttendanceRecords(userId);
        return res.status(200).json({
            message: "Attendance records fetched successfully",
            records
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const checkInHandler = async (req, res) => {
    try {
        const { userId } = req.body;
        const record = await checkIn(userId);
        return res.status(200).json({
            message: "Checked in successfully",
            record
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const checkOutHandler = async (req, res) => {
    try {
        const { userId } = req.body;
        const record = await checkOut(userId);
        return res.status(200).json({
            message: "Checked out successfully",
            record
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const correctionHandler = async (req, res) => {
    try {
        const { userId, recordId, reason } = req.body;
        const result = await requestCorrection(userId, recordId, reason);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default {
    getSummary: getSummaryHandler,
    getRecords: getRecordsHandler,
    checkIn: checkInHandler,
    checkOut: checkOutHandler,
    correction: correctionHandler
};
