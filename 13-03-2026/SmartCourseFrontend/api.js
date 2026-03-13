// api.js — ES6 Module: all fetch calls to the ASP.NET Core API

const BASE_URL = 'http://localhost:5022/api';

// ── Generic fetch helper ────────────────────────────────────────────────────

const request = async (endpoint, options = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(err.message || 'Request failed');
    }

    // 204 No Content has no body
    if (response.status === 204) return null;
    return response.json();
};

// ── Courses ─────────────────────────────────────────────────────────────────

export const getAllCourses = () => request('/courses');

export const getCourseById = (id) => request(`/courses/${id}`);

export const searchCourses = (keyword) =>
    request(`/courses/search?keyword=${encodeURIComponent(keyword)}`);

export const createCourse = (data) =>
    request('/courses', { method: 'POST', body: JSON.stringify(data) });

export const updateCourse = (id, data) =>
    request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteCourse = (id) =>
    request(`/courses/${id}`, { method: 'DELETE' });

// ── Students ─────────────────────────────────────────────────────────────────

export const getAllStudents = () => request('/students');

export const createStudent = (data) =>
    request('/students', { method: 'POST', body: JSON.stringify(data) });

export const deleteStudent = (id) =>
    request(`/students/${id}`, { method: 'DELETE' });

// ── Departments ───────────────────────────────────────────────────────────────

export const getAllDepartments = () => request('/departments');

export const createDepartment = (data) =>
    request('/departments', { method: 'POST', body: JSON.stringify(data) });

// ── Enrollments ───────────────────────────────────────────────────────────────

export const getAllEnrollments = () => request('/enrollments');

export const getStudentEnrollments = (studentId) =>
    request(`/enrollments/student/${studentId}`);

export const enrollStudent = (data) =>
    request('/enrollments', { method: 'POST', body: JSON.stringify(data) });

export const dropCourse = (enrollmentId) =>
    request(`/enrollments/${enrollmentId}`, { method: 'DELETE' });
