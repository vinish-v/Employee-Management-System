//to find missing data and the format . 
//this is like a seperate function
export const validateSignUp = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).send({ success: false, message: "passowrd must be 6 character long" });
    }
    return next();
}

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    return next();
}