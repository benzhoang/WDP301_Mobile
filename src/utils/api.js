import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log('API_BASE_URL:', API_BASE_URL); // Kiểm tra giá trị
// ==== AUTH ====
export const login = (email, password) =>
    axios.post(`${API_BASE_URL}/api/login`, { email, password });

export const register = (email, password, role) =>
    axios.post(`${API_BASE_URL}/api/register`, { email, password, role });

// ==== PROFILE ====
export const getProfile = (token) =>
    axios.get(`${API_BASE_URL}/api/profile`, { headers: { Authorization: `Bearer ${token}` } });

export const updateProfile = (token, data) =>
    axios.post(`${API_BASE_URL}/api/profile`, data, { headers: { Authorization: `Bearer ${token}` } });

// ==== PROGRAMS ====
export const getPrograms = () =>
    axios.get(`${API_BASE_URL}/api/programs`);

export const getProgramDetail = (id) =>
    axios.get(`${API_BASE_URL}/api/programs/${id}`);

export const getProgramsByCategory = (categoryId) =>
    axios.get(`${API_BASE_URL}/api/programs/category/${categoryId}`);

export const getProgramsWithStatus = (token) =>
    axios.get(`${API_BASE_URL}/api/programs/my-enrollment-status`, { headers: { Authorization: `Bearer ${token}` } });

// ==== ENROLLMENT ====
export const enrollProgram = (token, program_id) =>
    axios.post(
        `${API_BASE_URL}/api/enrollments`,
        { program_id },
        { headers: { Authorization: `Bearer ${token}` } }
    );

export const checkEnrollment = (token, programId) =>
    axios.get(
        `${API_BASE_URL}/api/enrollments/check/${programId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
// ==== CONSULTANT ====
export const getConsultants = () =>
    axios.get(`${API_BASE_URL}/api/consultants`);

export const getConsultantSlots = (consultantId) =>
    axios.get(`${API_BASE_URL}/api/consultant-slots/${consultantId}`);

// ==== BOOKING ====
export const createBooking = (token, data) =>
    axios.post(`${API_BASE_URL}/api/booking-sessions`, data, { headers: { Authorization: `Bearer ${token}` } });

export const getMyBookings = (token) =>
    axios.get(`${API_BASE_URL}/api/booking-sessions/scheduled`, { headers: { Authorization: `Bearer ${token}` } });

// ==== BLOG ====
export const getBlogs = () =>
    axios.get(`${API_BASE_URL}/api/blogs`);

// ==== CATEGORY ====
export const getCategories = () =>
    axios.get(`${API_BASE_URL}/api/categories`);

// ==== CONTENT ====
export const getContentByProgram = (programId) =>
    axios.get(`${API_BASE_URL}/api/content/program/${programId}`);

// ==== ASSESSMENT ====
export const getMyAssessments = (token) =>
    axios.get(`${API_BASE_URL}/api/assessments/me`, { headers: { Authorization: `Bearer ${token}` } });

export const takeAssessment = (token, type, responses) =>
    axios.post(`${API_BASE_URL}/api/assessments/take-test`, { type, responses }, { headers: { Authorization: `Bearer ${token}` } });

// ==== SURVEY ====
export const getSurveysByProgramAndType = (token, programId, type) =>
    axios.get(`${API_BASE_URL}/api/surveys/program/${programId}/type/${type}`, { headers: { Authorization: `Bearer ${token}` } });

// ==== FLAG ====
export const createFlag = (token, blog_id, reason) =>
    axios.post(`${API_BASE_URL}/api/flags`, { blog_id, reason }, { headers: { Authorization: `Bearer ${token}` } });

// Có thể bổ sung thêm các API khác khi cần thiết 
export const toggleContentCompletion = (token, enrollId, contentId) =>
    axios.patch(
        `${API_BASE_URL}/api/enrollments/${enrollId}/content/${contentId}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    ); 