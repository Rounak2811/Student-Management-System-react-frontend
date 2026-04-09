// services/api.js
import axios from "axios";

// const BASE_URL = "http://localhost:8080/RESTAPIDEMO-JBOSS-0.0.1-SNAPSHOT";
// const BASE_URL = "http://localhost:8080";
const BASE_URL ="https://student-management-system-springboot.onrender.com";

const api = axios.create({
    baseURL: BASE_URL,
});

// 1. Add the Access Token to every outgoing request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. Catch 401 errors and attempt to refresh the token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 (Unauthorized) and we haven't retried yet
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                // Call your backend refresh endpoint
                const response = await axios.post(`${BASE_URL}/auth/refreshToken`, {
                    token: refreshToken,
                });

                // Save the new tokens
                localStorage.setItem("accessToken", response.data.accessToken);

                // Update the failed request with the new token and retry it
                originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
                return api(originalRequest);

            } catch (err) {
                // If the refresh token is also expired, clear storage and force login
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login"; // Redirect to login page
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;