// Path: admin/js/admin-tasks.js

const assignTaskForm = document.getElementById('assignTaskForm');
const userSelect = document.getElementById('userSelect');
const token = localStorage.getItem('token');

// Populate the user dropdown with users from the server
async function populateUsers() {
  try {
    const res = await fetch('http://localhost:5000/api/admin/users', {
      headers: { 'Authorization': token }
    });

    const users = await res.json();
    userSelect.innerHTML = '<option disabled selected>Select User</option>';

    users.forEach(user => {
      userSelect.innerHTML += `
        <option value="${user._id}">${user.name} (${user.email})</option>
      `;
    });
  } catch (err) {
    alert('Failed to load users.');
  }
}

// Load all tasks assigned by admin and display in table
async function loadAssignedTasks() {
  try {
    const res = await fetch('http://localhost:5000/api/admin/tasks', {
      headers: { 'Authorization': token }
    });

    const tasks = await res.json();
    const taskTable = document.getElementById('taskTable');
    taskTable.innerHTML = '';

    tasks.forEach(task => {
      taskTable.innerHTML += `
        <tr>
          <td data-label="Title">${task.title}</td>
          <td data-label="Description">${task.description}</td>
          <td data-label="Deadline">${new Date(task.deadline).toLocaleDateString()}</td>
          <td data-label="Status">${task.status}</td>
          <td data-label="Assigned To">
            <span>
              ${task.assignedTo?.name || 'N/A'} 
              (<span class="ellipsis" title="${task.assignedTo?.email || 'N/A'}">
                ${task.assignedTo?.email || 'N/A'}
              </span>)
            </span>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    alert('Failed to load tasks.');
  }
}

// Handle task assignment form submission
if (assignTaskForm) {
  assignTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(assignTaskForm);
    const task = Object.fromEntries(formData);

    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(task)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        assignTaskForm.reset();
        loadAssignedTasks(); // Refresh the task table
      } else {
        alert(data.message || data.error);
      }
    } catch (err) {
      alert('Failed to assign task.');
    }
  });
}

// Initialize data on page load
if (userSelect) populateUsers();
loadAssignedTasks();
