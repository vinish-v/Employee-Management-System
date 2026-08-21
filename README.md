# Employee Management System 

A full-stack web application for managing workforce operations, daily attendance tracking, leave requests, and employee records. Built using Node.js, Express, MongoDB, and React (Vite).

---

## Overview

The Employee Management System features role-based access control with distinct portals for **Employees (Clients)** and **Administrators**:

- **Employee Portal**: Allows employees to check in/out daily, track working hours, request attendance corrections, apply for leaves, track remaining leave balances, and update personal profile details.
- **Admin Portal**: Gives administrators full oversight of the workforce — including real-time dashboard analytics, employee CRUD operations, leave request approvals/rejections, attendance log monitoring, and correction request resolution.

---

##  Features

### Employee / Client Portal
* **Dashboard**: Overview of attendance percentage, present days, remaining leaves, and pending leave applications.
* **Attendance Management**: Real-time Check-In and Check-Out buttons, daily status tracking, and optional attendance correction requests.
* **Leave Management**: Apply for leaves (Casual, Sick, Earned, Emergency), track real-time application status, and cancel pending requests.
* **My Profile**: View and edit user details (Phone, Department, Designation, Address).
* **Settings**: Toggle email/SMS notification preferences, change account password, and logout.

### Admin Portal
* **Control Center**: Real-time stats on total staff, present staff today, pending leave requests, and attendance correction alerts.
* **Employee Directory**: Add new employees with temporary passwords, edit existing roles/departments/designations, or delete employee records.
* **Leave Applications Management**: Filter leaves by status (`All`, `Pending`, `Approved`, `Rejected`), search by employee, and approve or reject applications with automatic leave balance calculation.
* **Attendance Logs & Corrections**: Organization-wide daily attendance logs with date filters and an interactive review modal to approve or reject correction requests.
* **Admin Settings**: System preferences, admin password updates, and session management.

---

## Tech Stack

- **Frontend**: React.js, React Router v6, Vite, Vanilla CSS3 (Custom Glassmorphic & Modern Styling), Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication & Security**: BcryptJS password hashing, Cors, Dotenv

---

## Project Structure

```
Employee-Management-System/
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI modals (AddEditEmployee, ReviewCorrection, Leave, etc.)
│   │   ├── Pages/
│   │   │   ├── Admin/        # Admin portal pages (Dashboard, EmployeeMgmt, AdminLeave, AdminAttendance, AdminSettings)
│   │   │   ├── Client/       # Employee portal pages (Dashboard, Attendance, Leave, Profile, Settings)
│   │   │   └── Public/       # Authentication pages (Login, SignUp)
│   │   ├── services/         # Axios API service integrations
│   │   ├── App.jsx           # App routes and layout configuration
│   │   └── main.jsx          # Entry point
│   └── package.json
│
└── server/
    ├── config/               # Database connection (MongoDB)
    ├── controllers/          # Route controller handlers
    ├── middleware/           # Request validation & authentication middlewares
    ├── models/               # Mongoose database schemas (User, Attendance, Leave, UserAttendance, UserSettings)
    ├── routes/               # Express API routes
    ├── services/             # Core business logic services
    ├── app.js                # Express app setup
    ├── server.js             # Server listener
    └── package.json
```

---

##  Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance running locally or a MongoDB Atlas connection URI

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=3005
MONGO_URI=mongodb://localhost:27017/employee-management
```

Start the backend server:

```bash
npm start
# or for development mode:
npm run dev
```

### 2. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` directory (optional):

```env
VITE_API_URL=http://localhost:3005/api
```

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

##  API Reference

### Authentication
- `POST /api/auth/signup` - Register a new employee account
- `POST /api/auth/login` - Authenticate user and return user object with role

### Attendance (`/api/attendance`)
- `GET /api/attendance/summary/:userId` - Fetch user attendance summary
- `GET /api/attendance/records/:userId` - Fetch attendance history
- `POST /api/attendance/checkin` - Mark Check-In for today
- `POST /api/attendance/checkout` - Mark Check-Out for today
- `POST /api/attendance/correction` - Submit attendance correction request

### Leaves (`/api/leave`)
- `POST /api/leave/apply` - Submit a new leave request
- `GET /api/leave/user/:userId` - Get user leave applications
- `DELETE /api/leave/:id` - Cancel pending leave request

### Admin (`/api/admin`)
- `GET /api/admin/stats` - Fetch overall dashboard statistics
- `GET /api/admin/employees` - List all employees
- `POST /api/admin/employees` - Add a new employee
- `PUT /api/admin/employees/:id` - Update employee details
- `DELETE /api/admin/employees/:id` - Delete an employee
- `GET /api/admin/leaves` - Fetch all organization leave applications
- `PUT /api/admin/leaves/:id/status` - Approve or reject leave request
- `GET /api/admin/attendance` - Fetch all organization attendance records
- `POST /api/admin/attendance/correction/handle` - Resolve attendance correction request

---

