//to find missing data and the format . 
//this is like a seperate function

export const validateAddEmployee = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    return next();
};

export const validateLeaveStatusUpdate = (req, res, next) => {
    const { status } = req.body;
    if (!status || !["Approved", "Rejected", "Pending"].includes(status)) {
        return res.status(400).json({ message: "Valid status (Approved, Rejected, Pending) is required" });
    }
    return next();
};

export const validateCorrectionHandle = (req, res, next) => {
    const { recordId, action } = req.body;
    if (!recordId || !action || !["Approve", "Reject"].includes(action)) {
        return res.status(400).json({ message: "Record ID and valid action (Approve, Reject) are required" });
    }
    return next();
};
