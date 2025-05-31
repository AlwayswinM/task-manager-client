# Task Manager - Client
A simple task management application built with React for frontend, connected to a Node.js + Express backend with a MongoDB database.

# 📌Features
✅ User Authentication (Login & Registration) 
✅ Task CRUD Operations (Add, Edit, Delete, Mark Complete) 
✅ Task Filtering (All, Completed, Incomplete) 
✅ Frontend API integration using Axios 
✅ Protected Routes & JWT-based Authentication

# ⚙️Setup Instructions

## 1. 🔗 Download Task Manager Client
You can get the project from **GitHub** or **Google Drive**:-

- 🔹 **GitHub Repository**: [Task Manager Client](https://github.com/YOUR_USERNAME/task-manager-client)
- 🔹 **Google Drive Download**: [Download ZIP](https://drive.google.com/uc?id=YOUR_FILE_ID&export=download)

## 2. Install Dependencies
Open a terminal in the project folder and run:
    `npm install`

## 3. Start the Client App
Run:
    `npm start`

# 🔗 Backend Connection
Ensure the backend is running separately by following these commands in your terminal:-

`cd ../task-manager-backend`
`npx nodemon server.js`

On successful implementation of these commands , Your backend should run on http://localhost:5000.

# 🛠️ Tech Stack
React (Frontend)
Axios (API calls)
React Hook Form (Form validation)
React Router (Navigation)
Node.js + Express (Backend)
MongoDB + Mongoose (Database)
JWT Authentication (Security)

## 📂 Client Folder Structure
```bash
task-manager-client/
│── src/
│   ├── components/        # Reusable components (TaskForm, TaskItem, TaskFilter)
│   ├── pages/             # Main pages (Dashboard, Login, Register)
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│── public/                # Static assets (favicon, index.html)
│── package.json           # Dependencies
│── README.md              # Project documentation
```
## 📂 Backend Folder Structure
```bash
task-manager-backend/
│── models/         # Mongoose models (User.js, Task.js)
│── routes/         # API routes (auth.js, tasks.js)
│── middleware/     # Authentication middleware
│── config/         # Database connection setup
│── server.js       # Main backend server
│── package.json    # Dependencies
│── .env            # Environment variables (MongoDB URL, JWT Secret)
│── README.md       # Project documentation
```

# Contact
In case of any technical issues or For any questions or suggestions, reach out via GitHub or email and please use the email id "alwayswin717love@gmail.com"




