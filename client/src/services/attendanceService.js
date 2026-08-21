//acts as a bridge between our front end and backend
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3005/api";

export const getAttendanceSummary = async (userId) => {
    const response = await axios.get(`${API_URL}/attendance/summary/${userId}`);
    return response.data;
};

export const getAttendanceRecords = async (userId) => {
    const response = await axios.get(`${API_URL}/attendance/records/${userId}`);
    return response.data;
};

export const checkInUser = async (userId) => {
    const response = await axios.post(`${API_URL}/attendance/checkin`, { userId });
    return response.data;
};

export const checkOutUser = async (userId) => {
    const response = await axios.post(`${API_URL}/attendance/checkout`, { userId });
    return response.data;
};

export const requestAttendanceCorrection = async (correctionData) => {
    const response = await axios.post(`${API_URL}/attendance/correction`, correctionData);
    return response.data;
};
