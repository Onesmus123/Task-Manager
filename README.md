# Task Management System

A complete **Task Management Web App**, where **admins manage users and assign tasks**, and **users view & update task statuses** - with email notifications and role-based access control. Built with **Node.js**, **Express**, **MongoDB**, and **HTML/CSS/JS**.

## Features

### Admin Panel (`/admin`)
- Register/Login as admin
- Add, update, or delete users
- Assign tasks and set deadlines
- View all tasks (with user info)
- Responsive layout with dark mode

### User Panel (`/frontend`)
- Login as user
- View assigned tasks
- Update task status
- Simple responsive UI

### Backend (Node.js + MongoDB)
- JWT-based authentication
- Role-based access middleware
- Nodemailer email integration
- Mongoose models & clean routes

## 🛠️ Tech Stack

**Frontend:**
- HTML + CSS
- JavaScript (Vanilla)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Nodemailer (Gmail SMTP)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Onesmus123/Task-Manager.git
cd task-manager
````

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create `.env` file in `backend/`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

### 4. Start the backend server

```bash
node server.js
```

### 5. Open the admin panel

* Open `admin/login.html` in your browser
* Register a new admin
* Access user management and task assignment

### 6. Open the user panel

* Open `frontend/index.html`
* Login as a user to view and update tasks

---

## Email Notifications

* Emails are sent when a task is assigned to a user

---