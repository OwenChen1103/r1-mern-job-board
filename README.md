# 🚀 Job Board CRUD App

A modern job board application built with Next.js + NestJS + MongoDB.

## 🛠️ Tech Stack

- **Frontend**: Next.js 13 (App Router) + TypeScript + Tailwind CSS
- **Backend**: NestJS (Node.js framework) + TypeScript
- **Database**: MongoDB + Mongoose
- **Other**: Concurrently (parallel development environment)

## ✨ Core Features

- Display job listings (title, company, location)
- Add new job
- Edit existing job
- Delete job
- Success/Error toast notifications

## 📸 Screenshots

### 1. Job List View
<img width="1591" height="932" alt="image" src="https://github.com/user-attachments/assets/cbe26a5b-23a5-4a95-a168-d5e8fd522e12" />
*Main job listings table with gradient header and modern design*

### 2. Add New Job Modal
<img width="1566" height="939" alt="image" src="https://github.com/user-attachments/assets/e0e80c19-e200-4da3-b484-e93518d675f1" />
*Form modal for creating new job postings*

### 3. Edit Job Modal
<img width="1709" height="976" alt="image" src="https://github.com/user-attachments/assets/6965a5a8-635f-47c1-ba86-537e96ed661f" />
*Pre-filled form for editing existing jobs*

### 4. Delete Job Modal
<img width="1709" height="976" alt="image" src="https://github.com/user-attachments/assets/116807ac-c736-4d5f-99a0-c1b8b362a507" />
*Confirmation modal for deleting job postings*

### 5. Success & Error Toast Notifications
<img width="1709" height="976" alt="image" src="https://github.com/user-attachments/assets/acefc980-c5e0-4a0f-bb6a-7ca5f3b97fee" />
<img width="1709" height="976" alt="image" src="https://github.com/user-attachments/assets/7f4c8600-8d7b-4ddc-a375-20819b044886" />
*Toast messages providing instant feedback for success (green) and error (red) actions*


## 🚀 Quick Start

### Prerequisites
- Node.js 18.17.0 or higher
- MongoDB running locally

### Install Dependencies
```bash
npm run install-all
```

### Setup Environment
```bash
cd backend
cp env.example .env
cd ..
```

### Development Environment
```bash
npm run dev
```

This will start both:
- Backend server (port 3001)
- Frontend development server (port 3000)

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
r1-mern-job-board/
├── frontend/        # Next.js frontend application
├── backend/         # NestJS backend
├── package.json     # Root configuration
└── README.md        # Project documentation
```

## 🔧 Environment Variables

Create `.env` file in `backend/` directory:
```
MONGODB_URI=mongodb://localhost:27017/job-board
PORT=3001
NODE_ENV=development
```

## 🌐 Deployment

### Local Development
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Production Deployment
This application can be deployed to:
- **Frontend**: Vercel, Netlify, or any static hosting service
- **Backend**: Railway, Render, or any Node.js hosting service
- **Database**: MongoDB Atlas (cloud) or self-hosted MongoDB

## 🔧 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Check what's using the port
lsof -i :3001
lsof -i :3000

# Kill the process
kill -9 <PID>
```

**MongoDB connection failed:**
- Ensure MongoDB is running: `brew services start mongodb-community`
- Check connection string in `.env` file

**Dependencies installation failed:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm run install-all
```

## 📝 Features Implementation

### Frontend (Next.js + TypeScript)
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive design for all devices
- ✅ Toast notifications for user feedback
- ✅ Form validation and error handling
- ✅ Smooth animations and transitions

### Backend (NestJS + TypeScript)
- ✅ RESTful API endpoints
- ✅ Data validation with class-validator
- ✅ MongoDB integration with Mongoose
- ✅ CORS configuration for frontend
- ✅ Error handling and logging

### Database (MongoDB)
- ✅ Job schema with all required fields
- ✅ Indexing for performance
- ✅ Data persistence and retrieval

## 🎯 Project Goals

This project demonstrates:
- Full-stack development skills
- Modern web technologies usage
- Clean code architecture
- User experience design
- API design and implementation

---

**Built with using Next.js, NestJS, and MongoDB**
