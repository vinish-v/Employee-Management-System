import mongoose from "mongoose";

//model schema for storing user settings data 
const userSettingsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        theme: {
            type: String,
            enum: ["light", "dark"],
            default: "light"
        },
        emailNotifications: {
            type: Boolean,
            default: true
        },
        smsNotifications: {
            type: Boolean,
            default: false
        },
        twoFactorAuth: {
            type: Boolean,
            default: false
        }
    }
);

const UserSettings = mongoose.model("UserSettings", userSettingsSchema);
export default UserSettings;
