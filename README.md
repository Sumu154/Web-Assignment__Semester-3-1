# 📝 Task Management Web Application

A full-stack web application for managing personal tasks, built with the MERN stack (MongoDB, Express.js, React, Node.js) and secured with JWT-based authentication.

---

## ✅ Features

### 👤 User Authentication
- Register users with email verification
- Login using JWT (JSON Web Token)
- Passwords are hashed for security
- Different user roles: admin, regular user

### 📋 Task Management
- Users can:
  - Create tasks with title, description, due date, and priority
  - Read all their tasks
  - Update/edit task details
  - Delete tasks
- Tasks can be:
  - Categorized
  - Sorted and filtered by priority or due date
  - Searched with search bar or filter criteria

---

## 🔧 Technologies Used

### Backend
- **Node.js** & **Express.js**: RESTful API and server-side logic
- **MongoDB** & **Mongoose**: Task and user data storage
- **JWT**: Secure authentication
- **bcrypt**: Password hashing

### Frontend
- **React**: Dynamic frontend UI
- **Axios**: HTTP requests to the backend
- **Tailwind CSS** (or your preferred styling): Styling components

---

## Run instructions 
### backend
- cd backend-server-side
- npm install
- nodemon .

### frontend
- cd frontend-client-side
- npm install
- npm run dev



