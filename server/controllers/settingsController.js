//imports from its respective service
import { getSettings, updateSettings, changePassword } from "../services/settingsService.js";
//This acts as the bridge btw routes and services

const getSettingsHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const settings = await getSettings(userId);
        return res.status(200).json({
            message: "Settings fetched successfully",
            settings
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateSettingsHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const settingsData = req.body;
        const settings = await updateSettings(userId, settingsData);
        return res.status(200).json({
            message: "Settings updated successfully",
            settings
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const changePasswordHandler = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const result = await changePassword(userId, oldPassword, newPassword);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default { getSettings: getSettingsHandler, updateSettings: updateSettingsHandler, changePassword: changePasswordHandler };
