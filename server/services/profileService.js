//user to manipulate the data 
//creating columns in db
//checking conditions
//imports and uses model schema .

import User from "../models/User.js";

export const getUserProfile = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new Error("User profile not found");
    }
    return user;
};

export const updateUserProfile = async (userId, profileData) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const { name, phone, department, designation, address } = profileData;
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, phone, department, designation, address },
        { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
        throw new Error("Failed to update user profile");
    }
    return updatedUser;
};
