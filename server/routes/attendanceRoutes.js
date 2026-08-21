import express from "express";
import attendanceController from "../controllers/attendanceController.js";
import { validateCheckIn, validateCorrection } from "../middleware/attendanceMiddleware.js";

const router = express.Router();

router.get("/summary/:userId", attendanceController.getSummary);
router.get("/records/:userId", attendanceController.getRecords);
router.post("/checkin", validateCheckIn, attendanceController.checkIn);
router.post("/checkout", validateCheckIn, attendanceController.checkOut);
router.post("/correction", validateCorrection, attendanceController.correction);

export default router;
