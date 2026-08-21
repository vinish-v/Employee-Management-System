import mongoose from 'mongoose';

const userAttendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    attendance: {
        type: Number,
        required: true,
        default: 100
    },
    presentDays: {
        type: Number,
        required: true,
        default: 0
    },
    leaveRemaining: {
        type: Number,
        required: true,
        default: 12
    },
    pendingRequests: {
        type: Number,
        required: true,
        default: 0
    }
});

export default mongoose.model("UserAttendance", userAttendanceSchema);