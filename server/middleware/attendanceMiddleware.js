//to find missing data and the format . 
//this is like a seperate function
export const validateCheckIn = (req, res, next) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required for check-in" });
    }
    return next();
};

export const validateCorrection = (req, res, next) => {
    const { userId, recordId, reason } = req.body;
    if (!userId || !recordId || !reason) {
        return res.status(400).json({ message: "User ID, Record ID, and reason are required for correction" });
    }
    return next();
};
