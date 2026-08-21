//to find missing data and the format . 
//this is like a seperate function
export const validateChangePassword = (req, res, next) => {
    const { userId, oldPassword, newPassword } = req.body;
    if (!userId || !oldPassword || !newPassword) {
        return res.status(400).json({ message: "User ID, current password, and new password are required" });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }
    return next();
};
