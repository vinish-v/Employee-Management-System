//acts as a bridge between our front end and backend
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3005/api";

export const getAdminStats = async () => {
    const response = await axios.get(`${API_URL}/admin/stats`);
    return response.data;
};

export const getAdminEmployees = async () => {
    const response = await axios.get(`${API_URL}/admin/employees`);
    return response.data;
};

export const addEmployee = async (employeeData) => {
    const response = await axios.post(`${API_URL}/admin/employees`, employeeData);
    return response.data;
};

export const updateEmployee = async (id, updateData) => {
    const response = await axios.put(`${API_URL}/admin/employees/${id}`, updateData);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await axios.delete(`${API_URL}/admin/employees/${id}`);
    return response.data;
};

export const getAdminLeaves = async () => {
    const response = await axios.get(`${API_URL}/admin/leaves`);
    return response.data;
};

export const updateLeaveStatus = async (id, status) => {
    const response = await axios.put(`${API_URL}/admin/leaves/${id}/status`, { status });
    return response.data;
};

export const getAdminAttendance = async () => {
    const response = await axios.get(`${API_URL}/admin/attendance`);
    return response.data;
};

export const handleAttendanceCorrection = async (data) => {
    const response = await axios.post(`${API_URL}/admin/attendance/correction/handle`, data);
    return response.data;
};
