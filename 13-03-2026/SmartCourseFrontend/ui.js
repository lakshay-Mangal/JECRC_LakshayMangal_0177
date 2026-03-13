// ui.js — ES6 Module: DOM rendering helpers using map(), template literals

// ── Toast Notifications ──────────────────────────────────────────────────────

export const showToast = (message, type = 'success') => {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => toast.classList.remove('show'), 3000);
};

// ── Loading Spinner ──────────────────────────────────────────────────────────

export const setLoading = (show) => {
    document.getElementById('loading').style.display = show ? 'flex' : 'none';
};

// ── Course Cards ─────────────────────────────────────────────────────────────

export const renderCourseCards = (courses, onEnroll, onDelete, onEdit, isAdmin) => {
    const container = document.getElementById('courseList');
    if (!courses.length) {
        container.innerHTML = `<p class="empty-msg">No courses found.</p>`;
        return;
    }

    // ES6 map() + template literals
    container.innerHTML = courses.map(course => `
        <div class="card" data-id="${course.courseId}">
            <div class="card-header">
                <span class="badge ${course.seatsAvailable ? 'badge-green' : 'badge-red'}">
                    ${course.seatsAvailable ? 'Seats Available' : 'Full'}
                </span>
                <span class="credits">${course.credits} Credits</span>
            </div>
            <h3 class="card-title">${course.courseName}</h3>
            <p class="card-dept">🏛 ${course.departmentName || 'Unknown Dept'}</p>
            <div class="card-actions">
                ${course.seatsAvailable
                    ? `<button class="btn btn-primary enroll-btn" data-id="${course.courseId}">Enroll</button>`
                    : `<button class="btn btn-disabled" disabled>Full</button>`
                }
                ${isAdmin ? `
                    <button class="btn btn-secondary edit-btn" data-id="${course.courseId}">Edit</button>
                    <button class="btn btn-danger delete-btn" data-id="${course.courseId}">Delete</button>
                ` : ''}
            </div>
        </div>
    `).join('');

    // Attach event listeners
    container.querySelectorAll('.enroll-btn').forEach(btn =>
        btn.addEventListener('click', () => onEnroll(Number(btn.dataset.id))));

    if (isAdmin) {
        container.querySelectorAll('.edit-btn').forEach(btn =>
            btn.addEventListener('click', () => onEdit(Number(btn.dataset.id))));
        container.querySelectorAll('.delete-btn').forEach(btn =>
            btn.addEventListener('click', () => onDelete(Number(btn.dataset.id))));
    }
};

// ── Enrollment Table ─────────────────────────────────────────────────────────

export const renderEnrollments = (enrollments, onDrop) => {
    const container = document.getElementById('enrollmentList');
    if (!enrollments.length) {
        container.innerHTML = `<p class="empty-msg">No enrollments found.</p>`;
        return;
    }

    container.innerHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Course</th>
                    <th>Student</th>
                    <th>Enrolled On</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${enrollments.map((e, i) => `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${e.courseName || e.courseId}</td>
                        <td>${e.studentName || e.studentId}</td>
                        <td>${new Date(e.enrollmentDate).toLocaleDateString()}</td>
                        <td>
                            <span class="badge ${e.dropDate ? 'badge-red' : 'badge-green'}">
                                ${e.dropDate ? 'Dropped' : 'Active'}
                            </span>
                        </td>
                        <td>
                            ${!e.dropDate
                                ? `<button class="btn btn-sm btn-danger drop-btn" data-id="${e.enrollmentId}">Drop</button>`
                                : `<span class="muted">${new Date(e.dropDate).toLocaleDateString()}</span>`
                            }
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.querySelectorAll('.drop-btn').forEach(btn =>
        btn.addEventListener('click', () => onDrop(Number(btn.dataset.id))));
};

// ── Department Dropdown ──────────────────────────────────────────────────────

export const populateDeptDropdown = (departments, selectId) => {
    const sel = document.getElementById(selectId);
    sel.innerHTML = `<option value="">-- Select Department --</option>` +
        departments.map(d => `<option value="${d.departmentId}">${d.departmentName}</option>`).join('');
};

// ── Student Dropdown ─────────────────────────────────────────────────────────

export const populateStudentDropdown = (students, selectId) => {
    const sel = document.getElementById(selectId);
    sel.innerHTML = `<option value="">-- Select Student --</option>` +
        students.map(s => `<option value="${s.studentId}">${s.name} (${s.role})</option>`).join('');
};
