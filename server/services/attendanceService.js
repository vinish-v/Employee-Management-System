//user to manipulate the data 
//creating columns in db
//checking conditions
//imports and uses model schema .

import Attendance from "../models/Attendance.js";
import UserAttendance from "../models/UserAttendance.js";

export const getAttendanceSummary = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    let userStats = await UserAttendance.findOne({ userId });
    if (!userStats) {
        const totalDays = await Attendance.countDocuments({ userId });
        const presentDays = await Attendance.countDocuments({ userId, status: "Present" });
        const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

        userStats = await UserAttendance.create({
            userId,
            attendance: attendancePercentage,
            presentDays,
            leaveRemaining: 12,
            pendingRequests: 0
        });
    }
    return userStats;
};

export const getAttendanceRecords = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const records = await Attendance.find({ userId }).sort({ date: -1 });
    return records;
};

export const checkIn = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const today = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let existingRecord = await Attendance.findOne({ userId, date: today });
    if (existingRecord && existingRecord.checkIn) {
        throw new Error("You have already checked in today");
    }

    if (!existingRecord) {
        existingRecord = await Attendance.create({
            userId,
            date: today,
            checkIn: currentTime,
            status: "Present"
        });
    } else {
        existingRecord.checkIn = currentTime;
        await existingRecord.save();
    }

    // update UserAttendance stats
    const presentDaysCount = await Attendance.countDocuments({ userId, status: "Present" });
    const totalDaysCount = await Attendance.countDocuments({ userId });
    const attendancePerc = totalDaysCount > 0 ? Math.round((presentDaysCount / totalDaysCount) * 100) : 100;

    await UserAttendance.findOneAndUpdate(
        { userId },
        {
            $set: { attendance: attendancePerc, presentDays: presentDaysCount },
            $setOnInsert: { leaveRemaining: 12, pendingRequests: 0 }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return existingRecord;
};

export const checkOut = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const today = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const existingRecord = await Attendance.findOne({ userId, date: today });
    if (!existingRecord || !existingRecord.checkIn) {
        throw new Error("You must check in first before checking out");
    }
    if (existingRecord.checkOut) {
        throw new Error("You have already checked out today");
    }

    existingRecord.checkOut = currentTime;
    existingRecord.workingHours = "8.0 hrs";
    await existingRecord.save();

    return existingRecord;
};

export const requestCorrection = async (userId, recordId, reason) => {
    if (!userId || !recordId || !reason) {
        throw new Error("User ID, Record ID, and reason are required");
    }
    const record = await Attendance.findOne({ _id: recordId, userId });
    if (!record) {
        throw new Error("Attendance record not found");
    }
    record.correctionRequested = true;
    record.correctionReason = reason;
    await record.save();

    return { message: "Correction request submitted successfully", record };
};
