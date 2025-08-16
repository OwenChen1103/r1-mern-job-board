# 🚀 Job Board CRUD App

A modern job board application built with Next.js + NestJS + MongoDB.

## 🛠️ Tech Stack

- **Frontend**: Next.js 13 (App Router) + TypeScript + Tailwind CSS
- **Backend**: NestJS (Node.js framework) + TypeScript
- **Database**: MongoDB + Mongoose
- **Other**: Concurrently (parallel development environment)

## ✨ Core Features

- 📋 Display job listings (title, company, location)
- ➕ Add new job
- ✏️ Edit existing job
- 🗑️ Delete job
- 🔔 Success/Error toast notifications

## 📸 Screenshots

### 1. Job List View
![Job List](./screenshots/job-list.png)
*Main job listings table with gradient header and modern design*

### 2. Add New Job Modal
![Add Job](./screenshots/add-job.png)
*Form modal for creating new job postings*

### 3. Edit Job Modal
![Edit Job](./screenshots/edit-job.png)
*Pre-filled form for editing existing jobs*

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

**Built with ❤️ using Next.js, NestJS, and MongoDB**
