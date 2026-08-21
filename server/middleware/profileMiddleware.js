//to find missing data and the format . 
//this is like a seperate function
export const validateProfileUpdate = (req, res, next) => {
    const { name } = req.body;
    if (name !== undefined && name.trim() === "") {
        return res.status(400).json({ message: "Name cannot be empty" });
    }
    return next();
};
