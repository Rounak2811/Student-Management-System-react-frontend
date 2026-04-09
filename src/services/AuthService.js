// services/AuthService.js
import axios from "axios";

// const BASE_URL = "http://localhost:8080/RESTAPIDEMO-JBOSS-0.0.1-SNAPSHOT/auth";
const BASE_URL = "https://student-management-system-springboot.onrender.com/auth"


export const login = async (username, password) => {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    if (response.data.jwt) {
        localStorage.setItem("accessToken", response.data.jwt);
        localStorage.setItem("refreshToken", response.data.refreshToken);
    }
    return response.data;
};

export const signup = (user) => {
    return axios.post(`${BASE_URL}/signup`, user);
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};