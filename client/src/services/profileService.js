//acts as a bridge between our front end and backend
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3005/api";

export const getProfile = async (userId) => {
    const response = await axios.get(`${API_URL}/profile/${userId}`);
    return response.data;
};

export const updateProfile = async (userId, profileData) => {
    const response = await axios.put(`${API_URL}/profile/${userId}`, profileData);
    return response.data;
};
