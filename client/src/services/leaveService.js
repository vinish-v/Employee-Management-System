//acts as a bridge between our front end and backend
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3005/api";

export const applyLeave = async (leaveData) => {
    const response = await axios.post(`${API_URL}/leave/apply`, leaveData);
    return response.data;
};

export const getUserLeaves = async (userId) => {
    const response = await axios.get(`${API_URL}/leave/user/${userId}`);
    return response.data;
};

export const cancelLeave = async (leaveId, userId) => {
    const response = await axios.delete(`${API_URL}/leave/${leaveId}`, { data: { userId } });
    return response.data;
};
