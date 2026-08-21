//imports from its respective service
import { getUserProfile, updateUserProfile } from "../services/profileService.js";
//This acts as the bridge btw routes and services

const getProfileHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await getUserProfile(userId);
        return res.status(200).json({
            message: "Profile retrieved successfully",
            profile
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateProfileHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const profileData = req.body;
        const updatedProfile = await updateUserProfile(userId, profileData);
        return res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default { getProfile: getProfileHandler, updateProfile: updateProfileHandler };
