//imports from its respective service
import { registerUser, LoginUser } from "../services/authService.js";
//This acts as the bridge btw routes and services



const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newuser = await registerUser(name, email, password);
        return res.status(200).json({
            message: "User created successfully",
            user: {
                id: newuser._id,
                name: newuser.name,
                email: newuser.email,
                role: newuser.role
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await LoginUser(email, password);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        };
        return res.status(200).json({ 
            message: "Login Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default { signUp, login };