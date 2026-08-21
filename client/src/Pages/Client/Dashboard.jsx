import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { getAttendanceSummary } from "../../services/attendanceService.js";
import { getUserLeaves } from "../../services/leaveService.js";

export default function Dashboard() {
    // Read the user data from local storage
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const [stats, setStats] = useState({
        attendance: "100%",
        presentDays: 0,
        leaveRemaining: 12,
        pendingRequests: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            const userId = user?.id || user?._id;
            if (!userId) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const [attendanceRes, leaveRes] = await Promise.allSettled([
                    getAttendanceSummary(userId),
                    getUserLeaves(userId)
                ]);

                let attendanceVal = "100%";
                let presentDaysVal = 0;
                let leaveRemainingVal = 12;
                let pendingRequestsVal = 0;

                if (attendanceRes.status === "fulfilled" && attendanceRes.value?.summary) {
                    const sum = attendanceRes.value.summary;
                    attendanceVal = `${sum.attendance ?? 100}%`;
                    presentDaysVal = sum.presentDays ?? 0;
                    leaveRemainingVal = sum.leaveRemaining ?? 12;
                }

                if (leaveRes.status === "fulfilled" && leaveRes.value?.leaves) {
                    const leaves = leaveRes.value.leaves;
                    pendingRequestsVal = leaves.filter(l => l.status === "Pending").length;
                }

                setStats({
                    attendance: attendanceVal,
                    presentDays: presentDaysVal,
                    leaveRemaining: leaveRemainingVal,
                    pendingRequests: pendingRequestsVal
                });
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    return (
        <div className="entire">
            <h1 style={{ color: "#ff4800ff", fontFamily: 'Garmond', fontSize: "2.5rem", marginBottom: "2rem", fontWeight: "600" }}>
                Welcome back, {user ? user.name : "Guest"}
            </h1>
            <div className="boxes">
                <div className="box" id="box1">
                    <h2>Attendance</h2>
                    <p>{loading ? "Loading..." : stats.attendance}</p>
                </div>
                <div className="box" id="box2">
                    <h2>Present Days</h2>
                    <p>{loading ? "Loading..." : stats.presentDays}</p>
                </div>
                <div className="box" id="box3">
                    <h2>Leave Remaining</h2>
                    <p>{loading ? "Loading..." : stats.leaveRemaining}</p>
                </div>
                <div className="box" id="box4">
                    <h2>Pending Requests</h2>
                    <p>{loading ? "Loading..." : stats.pendingRequests}</p>
                </div>
            </div>
        </div>
    );
}