const API_URL = 'http://localhost:5219/api';

let isLoginMode = true;

// --- Dark Mode Logic ---
function toggleDarkMode() {
    const htmlEl = document.documentElement;
    const currentTheme = htmlEl.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.getElementById('darkModeToggle').innerText = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    const toggleBtn = document.getElementById('darkModeToggle');
    if(toggleBtn) toggleBtn.innerText = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}
initializeTheme();

// --- Auth UI Logic ---
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').innerText = isLoginMode ? 'Login' : 'Register';
    document.getElementById('loginBtn').classList.toggle('hidden', !isLoginMode);
    document.getElementById('registerBtn').classList.toggle('hidden', isLoginMode);
    document.getElementById('roleGroup').style.display = isLoginMode ? 'none' : 'block';
    document.getElementById('toggleAuth').innerText = isLoginMode ? 'Need to register?' : 'Back to login';
}

function getJwtRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch (e) {
        return null;
    }
}

// --- API Calls: Auth ---
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API_URL}/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        checkAuthState();
    } else {
        alert('Login failed. Check credentials.');
    }
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const res = await fetch(`${API_URL}/Auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
    });

    if (res.ok) {
        alert('Registration successful! Please login.');
        toggleAuthMode();
    } else {
        const errorText = await res.text();
        alert(`Registration failed: ${errorText}`);
    }
}

function logout() {
    localStorage.removeItem('token');
    checkAuthState();
}

// --- API Calls: Employee ---
async function applyLeave() {
    const token = localStorage.getItem('token');
    const startDateRaw = document.getElementById('startDate').value;
    const endDateRaw = document.getElementById('endDate').value;
    
    if (!startDateRaw || !endDateRaw) {
        alert("Please select both a start and end date."); return;
    }
    if (new Date(endDateRaw) < new Date(startDateRaw)) {
        alert("End date cannot be before start date!"); return;
    }

    const request = {
        leaveType: document.getElementById('leaveType').value,
        startDate: startDateRaw,
        endDate: endDateRaw,
        reason: document.getElementById('reason').value
    };

    const res = await fetch(`${API_URL}/leave`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(request)
    });

    if (res.ok) {
        alert('Leave applied successfully!');
        document.getElementById('leaveType').value = '';
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
        document.getElementById('reason').value = '';
        loadMyLeaves();
    } else {
        const errorText = await res.text();
        alert(`Error: ${errorText}`);
    }
}

async function loadMyLeaves() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/leave/my-leaves`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        const leaves = await res.json();
        const list = document.getElementById('myLeavesList');
        list.innerHTML = '';
        leaves.forEach(l => {
            let badgeClass = 'bg-warning text-dark';
            if (l.status === 'Approved') badgeClass = 'bg-success';
            if (l.status === 'Rejected') badgeClass = 'bg-danger';

            list.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
                ${l.leaveType} (${new Date(l.startDate).toLocaleDateString()} to ${new Date(l.endDate).toLocaleDateString()})
                <span class="badge ${badgeClass}">${l.status}</span>
            </li>`;
        });
    }
}

// --- API Calls: Manager ---
async function loadAllLeavesForManager() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/leave/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        const leaves = await res.json();
        const tbody = document.getElementById('managerLeavesTableBody');
        tbody.innerHTML = '';
        leaves.forEach(l => {
            let badgeClass = 'bg-warning text-dark';
            if (l.status === 'Approved') badgeClass = 'bg-success';
            if (l.status === 'Rejected') badgeClass = 'bg-danger';

            const buttons = l.status === 'Pending' 
                ? `<button class="btn btn-sm btn-success me-1" onclick="updateLeaveStatus(${l.id}, 'approve')">Approve</button>
                   <button class="btn btn-sm btn-danger" onclick="updateLeaveStatus(${l.id}, 'reject')">Reject</button>`
                : `<span>-</span>`;
                
            tbody.innerHTML += `<tr>
                <td>${l.id}</td>
                <td>${l.leaveType}</td>
                <td>${new Date(l.startDate).toLocaleDateString()} to ${new Date(l.endDate).toLocaleDateString()}</td>
                <td><span class="badge ${badgeClass}">${l.status}</span></td>
                <td>${buttons}</td>
            </tr>`;
        });
    }
}

async function updateLeaveStatus(id, action) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/leave/${action}/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        loadAllLeavesForManager();
    } else {
        alert(`Failed to ${action} leave.`);
    }
}

// --- API Calls: Admin ---
async function loadEmployeesForAdmin() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/admin/employees`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        const employees = await res.json();
        const tbody = document.getElementById('adminEmployeesTableBody');
        tbody.innerHTML = '';
        employees.forEach(e => {
            tbody.innerHTML += `<tr>
                <td>${e.id}</td>
                <td>${e.username}</td>
                <td>${e.role}</td>
                <td><button class="btn btn-sm btn-danger" onclick="deleteEmployee(${e.id})">Delete</button></td>
            </tr>`;
        });
    }
}

async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/admin/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        loadEmployeesForAdmin();
    } else {
        alert("Failed to delete employee.");
    }
}

// --- App Initialization ---
function checkAuthState() {
    const token = localStorage.getItem('token');
    const role = getJwtRole();

    if (token) {
        document.getElementById('authSection').classList.add('hidden');
        document.getElementById('dashboardSection').classList.remove('hidden');
        document.getElementById('roleBadge').innerText = `Role: ${role}`;
        
        // Hide all views first
        document.getElementById('employeeView').classList.add('hidden');
        document.getElementById('managerView').classList.add('hidden');
        document.getElementById('adminView').classList.add('hidden');

        // Show specific view based on role
        if (role === 'Admin') {
            document.getElementById('adminView').classList.remove('hidden');
            loadEmployeesForAdmin();
        } else if (role === 'Manager') {
            document.getElementById('managerView').classList.remove('hidden');
            loadAllLeavesForManager();
        } else {
            document.getElementById('employeeView').classList.remove('hidden');
            loadMyLeaves();
        }
    } else {
        document.getElementById('authSection').classList.remove('hidden');
        document.getElementById('dashboardSection').classList.add('hidden');
    }
}

checkAuthState();