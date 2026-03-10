// Ensure this matches your running API URL
const API_URL = 'http://localhost:5219/api';

let isLoginMode = true;

// UI Toggles
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').innerText = isLoginMode ? 'Login' : 'Register';
    document.getElementById('loginBtn').classList.toggle('hidden', !isLoginMode);
    document.getElementById('registerBtn').classList.toggle('hidden', isLoginMode);
    document.getElementById('roleGroup').style.display = isLoginMode ? 'none' : 'block';
    document.getElementById('toggleAuth').innerText = isLoginMode ? 'Need to register?' : 'Back to login';
}

// Helper to get JWT payload
function getJwtRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // This is the specific claim key .NET uses for roles
        return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch (e) {
        return null;
    }
}

// Authentication
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
        localStorage.setItem('token', data.token); // Save token!
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
        alert('Registration failed.');
    }
}

function logout() {
    localStorage.removeItem('token');
    checkAuthState();
}

// Leave Operations
async function applyLeave() {
    const token = localStorage.getItem('token');
    const request = {
        leaveType: document.getElementById('leaveType').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        reason: document.getElementById('reason').value
    };

    const res = await fetch(`${API_URL}/LeaveRequest`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Attaching the JWT
        },
        body: JSON.stringify(request)
    });

    if (res.ok) {
        alert('Leave applied successfully!');
        loadMyLeaves();
    }
}

async function loadMyLeaves() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/LeaveRequest/my-leaves`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        const leaves = await res.json();
        const list = document.getElementById('myLeavesList');
        list.innerHTML = '';
        leaves.forEach(l => {
            list.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
                ${l.leaveType} (${new Date(l.startDate).toLocaleDateString()} to ${new Date(l.endDate).toLocaleDateString()})
                <span class="badge ${l.status === 'Approved' ? 'bg-success' : 'bg-warning text-dark'}">${l.status}</span>
            </li>`;
        });
    }
}

async function loadAllLeaves() {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/LeaveRequest/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        const leaves = await res.json();
        const tbody = document.getElementById('allLeavesTableBody');
        tbody.innerHTML = '';
        leaves.forEach(l => {
            const btn = l.status === 'Pending' 
                ? `<button class="btn btn-sm btn-success" onclick="approveLeave(${l.id})">Approve</button>`
                : '<span>-</span>';
                
            tbody.innerHTML += `<tr>
                <td>${l.id}</td>
                <td>${l.leaveType}</td>
                <td>${new Date(l.startDate).toLocaleDateString()} to ${new Date(l.endDate).toLocaleDateString()}</td>
                <td>${l.reason}</td>
                <td><span class="badge ${l.status === 'Approved' ? 'bg-success' : 'bg-warning text-dark'}">${l.status}</span></td>
                <td>${btn}</td>
            </tr>`;
        });
    }
}

async function approveLeave(id) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/LeaveRequest/approve/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) loadAllLeaves();
}

// App Initialization
function checkAuthState() {
    const token = localStorage.getItem('token');
    const role = getJwtRole();

    if (token) {
        document.getElementById('authSection').classList.add('hidden');
        document.getElementById('dashboardSection').classList.remove('hidden');
        
        if (role === 'Admin') {
            document.getElementById('adminView').classList.remove('hidden');
            document.getElementById('employeeView').classList.add('hidden');
            loadAllLeaves();
        } else {
            document.getElementById('employeeView').classList.remove('hidden');
            document.getElementById('adminView').classList.add('hidden');
            loadMyLeaves();
        }
    } else {
        document.getElementById('authSection').classList.remove('hidden');
        document.getElementById('dashboardSection').classList.add('hidden');
    }
}

// Run on page load
checkAuthState();