//user to manipulate the data 
//creating columns in db
//checking conditions
//imports and uses model schema .

import Leave from "../models/Leave.js";

export const applyLeave = async (userId, leaveType, startDate, endDate, reason) => {
    if (!userId || !leaveType || !startDate || !endDate || !reason) {
        throw new Error("All fields are required to apply for leave");
    }
    const newLeave = await Leave.create({
        userId,
        leaveType,
        startDate,
        endDate,
        reason,
        status: "Pending"
    });
    return newLeave;
};

export const getUserLeaves = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const leaves = await Leave.find({ userId }).sort({ appliedOn: -1 });
    return leaves;
};

export const cancelLeave = async (leaveId, userId) => {
    if (!leaveId || !userId) {
        throw new Error("Leave ID and User ID are required");
    }
    const leave = await Leave.findOne({ _id: leaveId, userId });
    if (!leave) {
        throw new Error("Leave request not found");
    }
    if (leave.status !== "Pending") {
        throw new Error("Only pending leave requests can be cancelled");
    }
    await Leave.findByIdAndDelete(leaveId);
    return { message: "Leave request cancelled successfully" };
};
