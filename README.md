# 🌉 SilentBridge

A full-stack web application designed to help users **learn, save, and practice sign language effectively**.

---

## 🚀 Overview

SilentBridge is a modern full-stack application built with React Router that allows users to:

- Learn sign language concepts
- Save signs they’ve learned
- Practice and track their confidence
- Manage their personal sign library

The application focuses on **personalized learning**, where each user has their own saved signs and progress.

---

## 🧱 Tech Stack

### Frontend

- React (via React Router)
- Tailwind CSS
- Responsive design (mobile + desktop)
- Dark mode support

### Backend

- React Router (full-stack loaders & actions)
- MongoDB (database)
- bcryptjs (password hashing)
- Cookie-based session authentication

---

## 🔐 Authentication

- Users can register and log in using email and password
- Passwords are securely hashed using bcrypt
- Sessions are stored in HTTP-only cookies
- Protected routes ensure only logged-in users can access private pages

---

## ✋ Features

### 🌐 Public Pages

- Home
- Learn
- Community
- About
- Login / Register

### 🔒 Private Pages

- Dashboard
- Add Sign
- My Signs
- Practice

---

## ✍️ Sign Management (CRUD)

Users can:

- ➕ Add new signs
- 📄 View saved signs
- ✏️ Edit existing signs
- ❌ Delete signs

Each sign includes:

- Name
- Category
- Description
- Resource link (e.g., YouTube)
- Notes
- Confidence level

All signs are linked to the logged-in user, ensuring data privacy.

---

## 🗄️ Database Structure

### Users Collection

- name
- email (unique)
- password (hashed)

### Signs Collection

- name
- category
- description
- video (resource link)
- notes
- confidence
- userId
- createdAt

---

## 🍪 Session Management

- Implemented using React Router cookie session storage
- Sessions persist login state across pages
- Users are redirected if not authenticated

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

MONGODB_CONNECTION_STRING=your_mongodb_connection_string  
SESSION_SECRET=your_secret_key  
MONGODB_DB_NAME=silentbridge

---

## 🧪 Development

### Install dependencies

npm install

### Run development server

npm run dev

App runs on:
http://localhost:5173

---

## 📦 Build

npm run build

---

## 🚀 Deployment

The app can be deployed using:

- Docker
- Railway
- Render
- Fly.io
- AWS / GCP / Azure

---

## ✅ Summary

SilentBridge demonstrates:

- Secure authentication (bcrypt + sessions)
- MongoDB integration
- Full CRUD functionality
- Route protection
- Clean UI/UX with Tailwind
- Responsive design

---

## 👩‍💻 Author

Built as a final project for full-stack development training.

---

## ❤️ Acknowledgment

Built using React Router and modern web development practices.
