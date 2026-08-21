//user to manipulate the data 
//creating columns in db
//checking conditions
//imports and uses model schema .

import UserSettings from "../models/UserSettings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getSettings = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    let settings = await UserSettings.findOne({ userId });
    if (!settings) {
        settings = await UserSettings.create({ userId });
    }
    return settings;
};

export const updateSettings = async (userId, settingsData) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const updated = await UserSettings.findOneAndUpdate(
        { userId },
        { ...settingsData },
        { new: true, upsert: true }
    );
    return updated;
};

export const changePassword = async (userId, oldPassword, newPassword) => {
    if (!userId || !oldPassword || !newPassword) {
        throw new Error("Current password and new password are required");
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
        throw new Error("Incorrect current password");
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();
    return { message: "Password changed successfully" };
};
