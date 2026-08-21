import express from "express";
import adminController from "../controllers/adminController.js";
import {
    validateAddEmployee,
    validateLeaveStatusUpdate,
    validateCorrectionHandle
} from "../middleware/adminMiddleware.js";

const router = express.Router();

// Dashboard Stats
router.get("/stats", adminController.getStats);

// Employee Management
router.get("/employees", adminController.getEmployees);
router.post("/employees", validateAddEmployee, adminController.addEmployee);
router.put("/employees/:id", adminController.updateEmployee);
router.delete("/employees/:id", adminController.deleteEmployee);

// Leave Management
router.get("/leaves", adminController.getLeaves);
router.put("/leaves/:id/status", validateLeaveStatusUpdate, adminController.updateLeaveStatus);

// Attendance Management
router.get("/attendance", adminController.getAttendance);
router.post("/attendance/correction/handle", validateCorrectionHandle, adminController.handleCorrection);

export default router;
