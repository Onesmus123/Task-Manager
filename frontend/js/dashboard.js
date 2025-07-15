// Path: frontend/js/dashboard.js

// Get reference to the task list table body
const taskList = document.getElementById('taskList');

// Retrieve the stored token from local storage
const token = localStorage.getItem('token');

// Fetch and display tasks assigned to the logged-in user
async function loadTasks() {
  const res = await fetch('http://localhost:5000/api/user-tasks', {
    headers: { 'Authorization': token }
  });
  const tasks = await res.json();

  // Clear existing table rows
  taskList.innerHTML = '';

  // Populate task list in table
  tasks.forEach(task => {
    taskList.innerHTML += `
      <tr>
        <td data-label="Title">${task.title}</td>
        <td data-label="Description">${task.description}</td>
        <td data-label="Deadline">${new Date(task.deadline).toLocaleDateString()}</td>
        <td data-label="Status">${task.status}</td>
        <td data-label="Update">
          <select onchange="updateStatus('${task._id}', this.value)">
            <option disabled selected>Change</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </td>
      </tr>
    `;
  });
}

// Update the status of a task and reload tasks
async function updateStatus(taskId, status) {
  await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ status })
  });
  loadTasks(); // Refresh task list after update
}

// Logout user by clearing token and redirecting to login
function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

// Initial load of tasks on page load
loadTasks();