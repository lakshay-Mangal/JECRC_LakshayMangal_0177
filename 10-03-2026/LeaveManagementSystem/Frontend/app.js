// Dark Mode Logic
function toggleDarkMode() {
    const htmlEl = document.documentElement; // Targets the <html> tag
    const currentTheme = htmlEl.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlEl.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
    document.getElementById('darkModeToggle').innerText = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// Check saved theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    
    const toggleBtn = document.getElementById('darkModeToggle');
    if(toggleBtn) {
        toggleBtn.innerText = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}
initializeTheme();


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
    
    // Grab the raw date strings
    const startDateRaw = document.getElementById('startDate').value;
    const endDateRaw = document.getElementById('endDate').value;
    
    // Basic frontend safeguard before even hitting the API
    if (!startDateRaw || !endDateRaw) {
        alert("Please select both a start and end date.");
        return;
    }
    
    if (new Date(endDateRaw) < new Date(startDateRaw)) {
        alert("End date cannot be before start date!");
        return;
    }

    const request = {
        leaveType: document.getElementById('leaveType').value,
        startDate: startDateRaw,
        endDate: endDateRaw,
        reason: document.getElementById('reason').value
    };

    const res = await fetch(`${API_URL}/LeaveRequest`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(request)
    });

    if (res.ok) {
        alert('Leave applied successfully!');
        
        // Clear the form fields after successful submission
        document.getElementById('leaveType').value = '';
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
        document.getElementById('reason').value = '';
        
        loadMyLeaves();
    } else {
        // This will capture our C# BadRequest messages and show them!
        const errorText = await res.text();
        alert(`Error: ${errorText}`);
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
            // Updated badge logic to handle "Rejected"
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
            let badgeClass = 'bg-warning text-dark';
            if (l.status === 'Approved') badgeClass = 'bg-success';
            if (l.status === 'Rejected') badgeClass = 'bg-danger';

            // Now displays both Approve and Reject buttons if Pending
            const buttons = l.status === 'Pending' 
                ? `<button class="btn btn-sm btn-success me-1" onclick="approveLeave(${l.id})">Approve</button>
                   <button class="btn btn-sm btn-danger" onclick="rejectLeave(${l.id})">Reject</button>`
                : `<span>-</span>`;
                
            tbody.innerHTML += `<tr>
                <td>${l.id}</td>
                <td>${l.leaveType}</td>
                <td>${new Date(l.startDate).toLocaleDateString()} to ${new Date(l.endDate).toLocaleDateString()}</td>
                <td>${l.reason}</td>
                <td><span class="badge ${badgeClass}">${l.status}</span></td>
                <td>${buttons}</td>
            </tr>`;
        });
    }
}

// Keep your existing approveLeave(id) function here, and add this right below it:

async function rejectLeave(id) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/LeaveRequest/reject/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
        loadAllLeaves(); // Refresh the table
    } else {
        alert("Failed to reject leave.");
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