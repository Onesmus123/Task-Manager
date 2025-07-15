// Path: admin/js/login.js

// Select the admin login form
const adminLoginForm = document.getElementById('adminLoginForm');

// Attach submit event listener if form exists
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Extract form data into credentials object
    const formData = new FormData(adminLoginForm);
    const credentials = Object.fromEntries(formData);

    try {
      // Send login request to backend
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await res.json();

      // Handle failed response
      if (!res.ok) {
        return alert(data.message || 'Login failed');
      }

      // Ensure logged-in user has admin role
      if (!data.user || data.user.role !== 'admin') {
        return alert('Access denied: Not an admin');
      }

      // Save token and redirect to admin dashboard
      localStorage.setItem('token', data.token);
      window.location.href = 'users.html';
      
    } catch (err) {
      // Catch and handle any unexpected error
      alert('An error occurred. Please try again.');
    }
  });
}
