import mongoose from "mongoose";

//model schema for storing daily attendance records 
const attendanceSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        date: {
            type: String,
            required: true
        },
        checkIn: {
            type: String,
            default: null
        },
        checkOut: {
            type: String,
            default: null
        },
        status: {
            type: String,
            enum: ["Present", "Absent", "Half-Day", "Late"],
            default: "Present"
        },
        workingHours: {
            type: String,
            default: "0.0 hrs"
        },
        correctionRequested: {
            type: Boolean,
            default: false
        },
        correctionReason: {
            type: String,
            default: ""
        }
    }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
