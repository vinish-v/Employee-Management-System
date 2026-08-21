//to find missing data and the format . 
//this is like a seperate function
export const validateLeaveRequest = (req, res, next) => {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    if (!userId || !leaveType || !startDate || !endDate || !reason) {
        return res.status(400).json({ message: "All fields (userId, leaveType, startDate, endDate, reason) are required" });
    }
    return next();
};
