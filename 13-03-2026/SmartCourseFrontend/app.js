// app.js — ES6 Module: main application logic
// Uses: Arrow Functions, Async/Await, filter(), map(), Modules, Template Literals

import {
    getAllCourses, searchCourses, createCourse, updateCourse, deleteCourse,
    getAllStudents, createStudent,
    getAllDepartments, createDepartment,
    getAllEnrollments, getStudentEnrollments, enrollStudent, dropCourse
} from './api.js';

import {
    showToast, setLoading,
    renderCourseCards, renderEnrollments,
    populateDeptDropdown, populateStudentDropdown
} from './ui.js';

// ── App State ─────────────────────────────────────────────────────────────────

let state = {
    courses: [],
    students: [],
    departments: [],
    enrollments: [],
    isAdmin: false,
    currentStudentId: null,
    editingCourseId: null,
};

// ── Navigation ────────────────────────────────────────────────────────────────

const showSection = (id) => {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelector(`[data-section="${id}"]`).classList.add('active');
};

// ── Load Data ─────────────────────────────────────────────────────────────────

const loadCourses = async () => {
    setLoading(true);
    try {
        state.courses = await getAllCourses();
        renderCourseCards(state.courses, handleEnroll, handleDeleteCourse, handleEditCourse, state.isAdmin);
    } catch (e) {
        showToast(e.message, 'error');
    } finally {
        setLoading(false);
    }
};

const loadEnrollments = async () => {
    setLoading(true);
    try {
        state.enrollments = state.isAdmin
            ? await getAllEnrollments()
            : await getStudentEnrollments(state.currentStudentId);
        renderEnrollments(state.enrollments, handleDrop);
    } catch (e) {
        showToast(e.message, 'error');
    } finally {
        setLoading(false);
    }
};

const loadDropdowns = async () => {
    try {
        [state.departments, state.students] = await Promise.all([
            getAllDepartments(), getAllStudents()
        ]);
        populateDeptDropdown(state.departments, 'courseFormDept');
        populateDeptDropdown(state.departments, 'editCourseDept');
        populateStudentDropdown(state.students, 'enrollStudent');
    } catch (e) {
        showToast(e.message, 'error');
    }
};

// ── Course Handlers ───────────────────────────────────────────────────────────

const handleSearch = async () => {
    const keyword = document.getElementById('searchInput').value.trim();
    setLoading(true);
    try {
        // Use JS filter() for client-side, or call API search
        const results = keyword
            ? state.courses.filter(c =>
                c.courseName.toLowerCase().includes(keyword.toLowerCase()) ||
                (c.departmentName && c.departmentName.toLowerCase().includes(keyword.toLowerCase()))
              )
            : state.courses;
        renderCourseCards(results, handleEnroll, handleDeleteCourse, handleEditCourse, state.isAdmin);
    } finally {
        setLoading(false);
    }
};

const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!state.isAdmin) { showToast('Access denied. Admins only.', 'error'); return; }
    const data = {
        courseName: document.getElementById('courseName').value,
        departmentId: Number(document.getElementById('courseFormDept').value),
        credits: Number(document.getElementById('courseCredits').value),
        seatsAvailable: document.getElementById('courseSeats').checked
    };
    try {
        await createCourse(data);
        showToast('Course created successfully!');
        e.target.reset();
        await loadCourses();
    } catch (err) {
        showToast(err.message, 'error');
    }
};

const handleDeleteCourse = async (id) => {
    if (!state.isAdmin) { showToast('Access denied. Admins only.', 'error'); return; }
    if (!confirm('Delete this course?')) return;
    try {
        await deleteCourse(id);
        showToast('Course deleted.');
        await loadCourses();
    } catch (err) {
        showToast(err.message, 'error');
    }
};

const handleEditCourse = async (id) => {
    const course = state.courses.find(c => c.courseId === id);
    if (!course) return;
    state.editingCourseId = id;
    document.getElementById('editCourseName').value = course.courseName;
    document.getElementById('editCourseDept').value = course.departmentId;
    document.getElementById('editCourseCredits').value = course.credits;
    document.getElementById('editCourseSeats').checked = course.seatsAvailable;
    document.getElementById('editModal').style.display = 'flex';
};

const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const data = {
        courseName: document.getElementById('editCourseName').value,
        departmentId: Number(document.getElementById('editCourseDept').value),
        credits: Number(document.getElementById('editCourseCredits').value),
        seatsAvailable: document.getElementById('editCourseSeats').checked
    };
    try {
        await updateCourse(state.editingCourseId, data);
        showToast('Course updated!');
        document.getElementById('editModal').style.display = 'none';
        await loadCourses();
    } catch (err) {
        showToast(err.message, 'error');
    }
};

// ── Enrollment Handlers ───────────────────────────────────────────────────────

const handleEnroll = async (courseId) => {
    const studentId = state.isAdmin
        ? Number(document.getElementById('enrollStudent').value)
        : state.currentStudentId;

    if (!studentId) { showToast('Please select a student first.', 'error'); return; }

    try {
        await enrollStudent({ courseId, studentId });
        showToast('Enrollment successful!');
        await loadCourses();
    } catch (err) {
        showToast(err.message, 'error');
    }
};

const handleDrop = async (enrollmentId) => {
    if (!confirm('Drop this course?')) return;
    try {
        await dropCourse(enrollmentId);
        showToast('Course dropped.');
        await loadEnrollments();
        await loadCourses();
    } catch (err) {
        showToast(err.message, 'error');
    }
};

// ── Student Handlers ──────────────────────────────────────────────────────────

const handleCreateStudent = async (e) => {
    e.preventDefault();
    if (!state.isAdmin) { showToast('Access denied. Admins only.', 'error'); return; }
    const data = {
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        role: document.getElementById('studentRole').value
    };
    try {
        await createStudent(data);
        showToast('Student registered!');
        e.target.reset();
        [state.students] = [await getAllStudents()];
        populateStudentDropdown(state.students, 'enrollStudent');
    } catch (err) {
        showToast(err.message, 'error');
    }
};

// ── Department Handlers ────────────────────────────────────────────────────────

const handleCreateDept = async (e) => {
    e.preventDefault();
    if (!state.isAdmin) { showToast('Access denied. Admins only.', 'error'); return; }
    const data = { departmentName: document.getElementById('deptName').value };
    try {
        await createDepartment(data);
        showToast('Department added!');
        e.target.reset();
        state.departments = await getAllDepartments();
        populateDeptDropdown(state.departments, 'courseFormDept');
        populateDeptDropdown(state.departments, 'editCourseDept');
    } catch (err) {
        showToast(err.message, 'error');
    }
};

// ── Role Toggle ───────────────────────────────────────────────────────────────

const applyRoleUI = () => {
    const btn = document.getElementById('roleToggle');
    btn.textContent = state.isAdmin ? '👤 Switch to Student' : '🛠 Switch to Admin';
    document.getElementById('roleLabel').textContent = state.isAdmin ? 'Admin View' : 'Student View';

    // Show/hide the "Acting as Student" panel on courses page
    document.getElementById('adminPanel').style.display = state.isAdmin ? 'block' : 'none';

    // Show/hide admin-only nav tabs
    document.querySelectorAll('.admin-only-tab').forEach(tab => {
        tab.style.display = state.isAdmin ? 'inline-block' : 'none';
    });

    // If student is on an admin-only section, redirect them to courses
    const activeSection = document.querySelector('.section.active')?.id;
    if (!state.isAdmin && (activeSection === 'admin' || activeSection === 'students')) {
        showSection('courses');
    }

    renderCourseCards(state.courses, handleEnroll, handleDeleteCourse, handleEditCourse, state.isAdmin);
};

const handleRoleSwitch = () => {
    state.isAdmin = !state.isAdmin;

    if (!state.isAdmin && !state.currentStudentId) {
        state.currentStudentId = state.students[0]?.studentId || null;
    }

    applyRoleUI();
};

// ── Init ──────────────────────────────────────────────────────────────────────

const init = async () => {
    await loadDropdowns();
    await loadCourses();

    // Default student is first student
    if (state.students.length) state.currentStudentId = state.students[0].studentId;

    // Apply initial role UI (hides admin tabs for student on load)
    applyRoleUI();

    // Nav
    document.querySelectorAll('.nav-btn').forEach(btn =>
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            showSection(section);
            if (section === 'enrollments') loadEnrollments();
        })
    );

    // Search
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keyup', e => {
        if (e.key === 'Enter') handleSearch();
    });

    // Forms
    document.getElementById('courseForm').addEventListener('submit', handleCreateCourse);
    document.getElementById('editCourseForm').addEventListener('submit', handleUpdateCourse);
    document.getElementById('studentForm').addEventListener('submit', handleCreateStudent);
    document.getElementById('deptForm').addEventListener('submit', handleCreateDept);

    // Modal close
    document.getElementById('closeModal').addEventListener('click', () => {
        document.getElementById('editModal').style.display = 'none';
    });

    // Role switch
    document.getElementById('roleToggle').addEventListener('click', handleRoleSwitch);
};

document.addEventListener('DOMContentLoaded', init);
