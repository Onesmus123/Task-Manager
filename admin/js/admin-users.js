// Path: admin/js/admin-users.js

const token = localStorage.getItem('token');
const userTable = document.getElementById('userTable');
const addForm = document.getElementById('addUserForm');

// Fetch and display all users in the user table
async function loadUsers() {
  try {
    const res = await fetch('http://localhost:5000/api/admin/users', {
      headers: { 'Authorization': token }
    });

    const users = await res.json();
    userTable.innerHTML = '';

    users.forEach(user => {
      userTable.innerHTML += `
        <tr>
          <td data-label="Name">${user.name}</td>
          <td data-label="Email">
            <span class="ellipsis" title="${user.email}">${user.email}</span>
          </td>
          <td data-label="Phone">${user.phone || ''}</td>
          <td data-label="Actions">
            <button class="edit-btn" onclick="showEdit('${user._id}', '${user.name}', '${user.email}', '${user.phone}')">Edit</button>
            <button class="delete-btn" onclick="deleteUser('${user._id}')">Delete</button>
          </td>
        </tr>
      `;
    });
  } catch (err) {
    alert('Failed to load users.');
  }
}

// Handle add user form submission
addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(addForm);
  const user = Object.fromEntries(formData);

  try {
    const res = await fetch('http://localhost:5000/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(user)
    });

    const data = await res.json();
    alert(data.message);
    loadUsers();
    addForm.reset();
  } catch (err) {
    alert('Failed to add user.');
  }
});

// Show editable prompt dialog and update user info
function showEdit(id, name, email, phone) {
  const newName = prompt('Name:', name);
  const newEmail = prompt('Email:', email);
  const newPhone = prompt('Phone:', phone);

  if (newName && newEmail) {
    editUser(id, {
      name: newName,
      email: newEmail,
      phone: newPhone
    });
  }
}

// Update user info in the backend
async function editUser(id, updates) {
  try {
    const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(updates)
    });

    const data = await res.json();
    alert(data.message);
    loadUsers();
  } catch (err) {
    alert('Failed to update user.');
  }
}

// Delete user by ID after confirmation
async function deleteUser(id) {
  if (!confirm('Delete this user?')) return;

  try {
    const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': token }
    });

    const data = await res.json();
    alert(data.message);
    loadUsers();
  } catch (err) {
    alert('Failed to delete user.');
  }
}

// Initial load of users on page load
loadUsers();