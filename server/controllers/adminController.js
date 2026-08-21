//imports from its respective service
import * as adminService from "../services/adminService.js";
//This acts as the bridge btw routes and services

const getStatsHandler = async (req, res) => {
    try {
        const stats = await adminService.getDashboardStats();
        return res.status(200).json({
            message: "Admin dashboard stats fetched successfully",
            stats
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getEmployeesHandler = async (req, res) => {
    try {
        const employees = await adminService.getAllEmployees();
        return res.status(200).json({
            message: "Employees fetched successfully",
            employees
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const addEmployeeHandler = async (req, res) => {
    try {
        const employeeData = req.body;
        const employee = await adminService.addEmployee(employeeData);
        return res.status(201).json({
            message: "Employee added successfully",
            employee
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateEmployeeHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const employee = await adminService.updateEmployee(id, updateData);
        return res.status(200).json({
            message: "Employee updated successfully",
            employee
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteEmployeeHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await adminService.deleteEmployee(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getLeavesHandler = async (req, res) => {
    try {
        const leaves = await adminService.getAllLeaves();
        return res.status(200).json({
            message: "Leaves fetched successfully",
            leaves
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateLeaveStatusHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const leave = await adminService.updateLeaveStatus(id, status);
        return res.status(200).json({
            message: `Leave status updated to ${status}`,
            leave
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAttendanceHandler = async (req, res) => {
    try {
        const records = await adminService.getAllAttendanceRecords();
        return res.status(200).json({
            message: "Attendance records fetched successfully",
            records
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const handleCorrectionHandler = async (req, res) => {
    try {
        const { recordId, action, checkIn, checkOut } = req.body;
        const record = await adminService.handleCorrectionRequest(recordId, action, checkIn, checkOut);
        return res.status(200).json({
            message: `Correction request ${action === "Approve" ? "approved" : "rejected"}`,
            record
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default {
    getStats: getStatsHandler,
    getEmployees: getEmployeesHandler,
    addEmployee: addEmployeeHandler,
    updateEmployee: updateEmployeeHandler,
    deleteEmployee: deleteEmployeeHandler,
    getLeaves: getLeavesHandler,
    updateLeaveStatus: updateLeaveStatusHandler,
    getAttendance: getAttendanceHandler,
    handleCorrection: handleCorrectionHandler
};
