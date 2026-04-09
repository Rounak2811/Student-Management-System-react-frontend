// services/StudentService.jsx
import api from "./api"; // Import our custom configured axios instance

const STUDENT_URL = "/students"; // Note: BASE_URL is already handled in api.js

export const getStudents = () => api.get(STUDENT_URL);

export const getStudentById = (id) => api.get(`${STUDENT_URL}/${id}`);

export const createStudent = (student) => api.post(STUDENT_URL, student);

export const updateStudent = (id, student) => api.put(`${STUDENT_URL}/${id}`, student);

export const deleteStudent = (id) => api.delete(`${STUDENT_URL}/${id}`);

export const searchStudentByName = (name) => api.get(`${STUDENT_URL}/search?name=${name}`);