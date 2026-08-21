//imports from its respective service
import { applyLeave, getUserLeaves, cancelLeave } from "../services/leaveService.js";
//This acts as the bridge btw routes and services

const applyLeaveHandler = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;
        const leave = await applyLeave(userId, leaveType, startDate, endDate, reason);
        return res.status(200).json({
            message: "Leave application submitted successfully",
            leave
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getLeavesHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const leaves = await getUserLeaves(userId);
        return res.status(200).json({
            message: "Leaves fetched successfully",
            leaves
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const cancelLeaveHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const result = await cancelLeave(id, userId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default { applyLeave: applyLeaveHandler, getLeaves: getLeavesHandler, cancelLeave: cancelLeaveHandler };
