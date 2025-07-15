// Path: frontend/js/login.js

// Get reference to the login form element
const loginForm = document.getElementById('loginForm');

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Collect form data and convert to plain object
  const formData = new FormData(loginForm);
  const credentials = Object.fromEntries(formData);

  // Send login request to backend
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  const data = await res.json();

  // On successful login, store token and user in local storage
  if (res.ok && data.user) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Redirect user to dashboard page
    window.location.href = 'dashboard.html';
  } else {
    // Show error alert if login failed
    alert(data.message || data.error || 'Login failed');
  }
});
