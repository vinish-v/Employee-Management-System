//acts as a bridge between our front end and backend
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3005/api";

export const getSettings = async (userId) => {
    const response = await axios.get(`${API_URL}/settings/${userId}`);
    return response.data;
};

export const updateSettings = async (userId, settingsData) => {
    const response = await axios.put(`${API_URL}/settings/${userId}`, settingsData);
    return response.data;
};

export const changePassword = async (passwordData) => {
    const response = await axios.post(`${API_URL}/settings/change-password`, passwordData);
    return response.data;
};
