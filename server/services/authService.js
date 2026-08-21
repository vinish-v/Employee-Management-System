//user to manipulate the data 
//creating columns in db
//checking conditions
//imports and uses model schema .


import bcrypt from "bcryptjs"
import User from "../models/User.js"


export const registerUser = async (name, email, password) => {
    const registeredUser = await User.findOne({ email });
    if (registeredUser) {
        throw new Error("The user already exists");
    }
    const roundSalts = 10;
    const hashPassword = await bcrypt.hash(password, roundSalts);
    const newUser = await User.create({ name, email, password: hashPassword, role: "client" });
    return newUser;
};
export const LoginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Password incorrect");
    }
    return user;
}
