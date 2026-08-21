//acts as a bridge between our front end and backend
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const signUpUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;

};

export const LoginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};
