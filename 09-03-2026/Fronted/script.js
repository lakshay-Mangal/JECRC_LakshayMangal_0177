const API_BASE_URL = 'http://localhost:5039/api/todo'; 
let allTasks = []; 
let currentFilter = 'All';

// 1. Dark Mode Logic [cite: 111]
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

async function fetchTasks() {
    try {
        const response = await fetch(API_BASE_URL);
        allTasks = await response.json();
        renderTasks();
    } catch (error) { console.error('Error fetching tasks:', error); }
}

// 2. Filter Logic [cite: 109]
function setFilter(filterType) {
    currentFilter = filterType;
    renderTasks();
}

// 3. Search Logic [cite: 112]
function handleSearch() { renderTasks(); }

function renderTasks() {
    const taskList = document.getElementById('taskList');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    taskList.innerHTML = ''; 

    const filteredTasks = allTasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm);
        const matchesFilter = 
            currentFilter === 'All' || 
            (currentFilter === 'Active' && !task.isCompleted) || 
            (currentFilter === 'Completed' && task.isCompleted);
        return matchesSearch && matchesFilter;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add(`priority-${task.priority || 'Normal'}`);
        if (task.isCompleted) li.classList.add('completed');

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.isCompleted ? 'checked' : ''} 
                       onchange="toggleComplete(${task.id}, '${task.title}', ${task.isCompleted}, '${task.priority || 'Normal'}')">
                <span class="task-text">${task.title}</span>
                <span class="priority-badge">${task.priority || 'Normal'}</span>
            </div>
            <div class="btn-group">
                <button class="edit-btn" onclick="editTask(${task.id}, '${task.title}', ${task.isCompleted}, '${task.priority || 'Normal'}')">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const title = document.getElementById('taskInput').value.trim();
    const priority = document.getElementById('priorityInput').value;

    if (!title) return alert('Please enter a task name.');

    try {
        await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, isCompleted: false, priority })
        });
        document.getElementById('taskInput').value = ''; 
        fetchTasks(); 
    } catch (error) { console.error('Error adding task:', error); }
}

// 4. Edit Todo Logic [cite: 110]
async function editTask(id, currentTitle, isCompleted, priority) {
    const newTitle = prompt("Edit task:", currentTitle);
    if (newTitle === null || newTitle.trim() === "") return; 

    try {
        await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, title: newTitle.trim(), isCompleted, priority })
        });
        fetchTasks();
    } catch (error) { console.error('Error editing task:', error); }
}

async function toggleComplete(id, title, currentStatus, priority) {
    try {
        await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, title, isCompleted: !currentStatus, priority })
        });
        fetchTasks();
    } catch (error) { console.error('Error updating task:', error); }
}

async function deleteTask(id) {
    try {
        await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
        fetchTasks();
    } catch (error) { console.error('Error deleting task:', error); }
}

fetchTasks();