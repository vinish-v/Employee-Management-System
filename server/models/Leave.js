import mongoose from "mongoose";

//model schema for storing leave data 
const leaveSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        leaveType: {
            type: String,
            required: true,
            enum: ["Casual Leave", "Sick Leave", "Earned Leave", "Emergency Leave"]
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        reason: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        },
        appliedOn: {
            type: Date,
            default: Date.now
        }
    }
);

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
