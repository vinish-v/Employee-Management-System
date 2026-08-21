//user to manipulate the data 
//creating columns in db
//checking conditions
//imports and uses model schema .

import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Leave from "../models/Leave.js";
import Attendance from "../models/Attendance.js";
import UserAttendance from "../models/UserAttendance.js";

export const getDashboardStats = async () => {
    const totalEmployees = await User.countDocuments({ role: { $in: ["client", "employee"] } });
    const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
    const pendingCorrections = await Attendance.countDocuments({ correctionRequested: true });
    
    const today = new Date().toISOString().split("T")[0];
    const presentToday = await Attendance.countDocuments({ date: today, status: "Present" });

    return {
        totalEmployees,
        pendingLeaves,
        pendingCorrections,
        presentToday
    };
};

export const getAllEmployees = async () => {
    const employees = await User.find().select("-password").sort({ name: 1 });
    return employees;
};

export const addEmployee = async ({ name, email, password, role, department, designation, phone, address }) => {
    if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const roundSalts = 10;
    const hashPassword = await bcrypt.hash(password, roundSalts);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        role: role || "client",
        department: department || "General",
        designation: designation || "Employee",
        phone: phone || "",
        address: address || ""
    });

    // Initialize attendance record stats
    await UserAttendance.create({
        userId: newUser._id,
        attendance: 100,
        presentDays: 0,
        leaveRemaining: 12,
        pendingRequests: 0
    });

    return {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        designation: newUser.designation,
        phone: newUser.phone,
        address: newUser.address
    };
};

export const updateEmployee = async (userId, updateData) => {
    if (!userId) {
        throw new Error("User ID is required");
    }

    // Don't allow password updates through this method directly
    delete updateData.password;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
        throw new Error("Employee not found");
    }
    return updatedUser;
};

export const deleteEmployee = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new Error("Employee not found");
    }
    // Clean up associated records
    await Leave.deleteMany({ userId });
    await Attendance.deleteMany({ userId });
    await UserAttendance.deleteMany({ userId });

    return { message: "Employee and associated records deleted successfully" };
};

export const getAllLeaves = async () => {
    const leaves = await Leave.find()
        .populate("userId", "name email department designation")
        .sort({ appliedOn: -1 });
    return leaves;
};

export const updateLeaveStatus = async (leaveId, status) => {
    if (!leaveId || !status) {
        throw new Error("Leave ID and status are required");
    }
    if (!["Approved", "Rejected", "Pending"].includes(status)) {
        throw new Error("Invalid status value");
    }

    const leave = await Leave.findById(leaveId);
    if (!leave) {
        throw new Error("Leave request not found");
    }

    const previousStatus = leave.status;
    leave.status = status;
    await leave.save();

    // If approved and was not previously approved, adjust remaining leaves
    if (status === "Approved" && previousStatus !== "Approved") {
        await UserAttendance.findOneAndUpdate(
            { userId: leave.userId },
            { $inc: { leaveRemaining: -1 } }
        );
    }

    return leave;
};

export const getAllAttendanceRecords = async () => {
    const records = await Attendance.find()
        .populate("userId", "name email department designation")
        .sort({ date: -1 });
    return records;
};

export const handleCorrectionRequest = async (recordId, action, checkIn, checkOut) => {
    if (!recordId || !action) {
        throw new Error("Record ID and action are required");
    }

    const record = await Attendance.findById(recordId);
    if (!record) {
        throw new Error("Attendance record not found");
    }

    if (action === "Approve") {
        if (checkIn) record.checkIn = checkIn;
        if (checkOut) record.checkOut = checkOut;
        record.status = "Present";
        record.workingHours = "8.0 hrs";
        record.correctionRequested = false;
        record.correctionReason = "";
    } else if (action === "Reject") {
        record.correctionRequested = false;
    }

    await record.save();
    return record;
};
