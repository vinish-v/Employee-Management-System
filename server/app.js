import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors()); // we use cors here 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//we define routes here

app.use("/api/auth", authRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes);

const port = process.env.PORT || 3005;
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})