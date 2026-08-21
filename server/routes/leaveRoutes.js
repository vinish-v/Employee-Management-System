import express from "express";
import leaveController from "../controllers/leaveController.js";
import { validateLeaveRequest } from "../middleware/leaveMiddleware.js";

const router = express.Router();

router.post("/apply", validateLeaveRequest, leaveController.applyLeave);
router.get("/user/:userId", leaveController.getLeaves);
router.delete("/:id", leaveController.cancelLeave);

export default router;
