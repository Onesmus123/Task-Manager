// Path: frontend/js/register.js

// Get reference to the registration form element
const registerForm = document.getElementById('registerForm');

// Handle registration form submission
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Collect form data and convert to plain object
  const formData = new FormData(registerForm);
  const user = Object.fromEntries(formData);

  // Send registration request to backend
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

  const data = await res.json();

  // On successful registration, redirect to login page
  if (res.ok) {
    alert(data.message); // Show success message
    window.location.href = 'login.html';
  } else {
    // Show error message on failure
    alert(data.message || data.error);
  }
});
