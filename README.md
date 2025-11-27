# LearnLink Kenya CBE - Fullstack Application

![LearnLink Logo](./client/public/logo.png)  

**LearnLink Kenya CBE** is a comprehensive web platform designed to facilitate Competency-Based Education (CBE) in Kenya. It allows teachers, students, and stakeholders to manage assessments, resources, notifications, and analytics, all in one integrated system. The project uses a **MERN stack** (MongoDB, Express, React, Node.js) with **Vite** for the frontend, and **Socket.IO** for real-time features.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication & role-based access (teachers, students, admins, stakeholders)
- Create, manage, and publish CBE assessments
- Track student competencies and grades
- Upload and manage learning resources
- Real-time notifications using Socket.IO
- Analytics dashboard for teachers and stakeholders
- File upload system integrated with Cloudinary

---

## Tech Stack

**Backend:**

- Node.js & Express
- MongoDB & Mongoose
- Socket.IO for real-time events
- JWT authentication

**Frontend:**

- React (Vite)
- Tailwind CSS for styling
- Framer Motion for animations
- React Query for API data fetching
- Chart.js & react-chartjs-2 for analytics
- Cloudinary for media uploads

---

## Project Structure


---

## Setup & Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/learnlink-kenya-cbe.git
cd learnlink-kenya-cbe
Install dependencies for both server and client:

npm run install-deps


Create .env files for both backend and frontend:

server/.env (example):

NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cbe-platform
MONGODB_ATLAS_URI=your-mongodb-atlas-uri
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d


client/.env (example):

VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_API_URL=http://localhost:5000/api

Running the Application
Start Backend
cd server
npm run dev


The backend will run on http://localhost:5000.

Start Frontend
cd client
npm run dev


The frontend will run on http://localhost:5173.

Deployment

Backend: Deploy the server folder to platforms like Render, Railway, Heroku, or your own VPS.
         https://learnlink-backend-ter4.onrender.com

Frontend: Deploy the client folder to Vercel, Netlify, or similar hosting.

Environment Variables: Make sure to configure all .env variables for production environments (MongoDB URI, JWT secret, Cloudinary credentials).

Contributing

Contributions are welcome! Please follow these steps:

Fork the repository

Create a new branch: git checkout -b feature-name

Commit your changes: git commit -m "Add some feature"

Push to the branch: git push origin feature-name

Open a Pull Request

License

This project is MIT Licensed. See the LICENSE file for details.

Contact

Festus Kyalo Mutua
Email: festusk54@gmail.com

GitHub: https://github.com/festuskyalomutua
